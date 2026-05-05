async function renderNovelDetails() {
  const params = new URLSearchParams(window.location.search);
  const novelId = parseInt(params.get("id"));
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  if (!novelId) return;

  let novel;
  try {
    const res = await fetch(`${API_BASE_URL}/api/novels/${novelId}`, {
      cache: "no-store",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    if (!res.ok) throw new Error("Novel not found");
    novel = await res.json();
  } catch (err) {
    console.error("Failed to load novel:", err);
    const titleEl = document.querySelector(".novel-title");
    if (titleEl)
      titleEl.innerText =
        lang === "ar"
          ? "الرواية غير موجودة"
          : lang === "es"
            ? "Novela no encontrada"
            : "Novel Not Found";
    const descEl = document.querySelector(".description");
    if (descEl)
      descEl.innerText =
        lang === "ar"
          ? "هذا الكتاب غير موجود في قاعدة بياناتنا."
          : lang === "es"
            ? "Este libro no existe en nuestra base de datos."
            : "This book does not exist in our database.";
    return;
  }

  const title = novel.title;
  const description = novel.description;
  const authorName = novel.authorName || "Unknown Author";
  const imgSrc = novel.imgSrc
    ? novel.imgSrc.startsWith("http")
      ? novel.imgSrc
      : `${API_BASE_URL}/${novel.imgSrc}`
    : "";

  // Dynamic SEO update
  document.title = `${title} - NextPage`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc)
    metaDesc.setAttribute("content", description.substring(0, 160) + "...");

  const imgEl = document.querySelector(".image-section img");
  if (imgEl) imgEl.src = imgSrc;

  const titleEl = document.querySelector(".novel-title");
  if (titleEl) titleEl.textContent = title;

  const authorEl = document.getElementById("authorLink");
  if (authorEl) {
    const byPrefix = { en: "by", ar: "بواسطة", es: "por" }[lang] || "by";
    authorEl.textContent = `${byPrefix} ${authorName}`;
    authorEl.href = `author_details.html?id=${novel.authorId}`;
  }

  // Fetch categories to render chips with localized names
  let allCategories = [];
  try {
    allCategories = await fetchCategories();
  } catch (_) {}

  const chipsEl = document.getElementById("categoryChips");
  if (chipsEl) {
    chipsEl.innerHTML = novel.categories
      .map((catId) => {
        const cat = allCategories.find((c) => c.id === catId);
        const catName = cat ? cat[lang] || cat.en : catId;
        return `<a href="discover.html?category=${encodeURIComponent(catId)}" class="category-chip">${catName}</a>`;
      })
      .join("");
  }

  const descEl = document.querySelector(".description");
  if (descEl) descEl.textContent = description;

  const ratingEl = document.querySelector(".rating-value");
  if (ratingEl) ratingEl.textContent = novel.rating;

  const priceEl = document.querySelector(".novel-price");
  if (priceEl) {
    priceEl.textContent = novel.price
      ? `$${parseFloat(novel.price).toFixed(2)}`
      : "Free";
  }

  // Render chapters
  const chapterListEl = document.getElementById("chapterList");
  if (chapterListEl) {
    if (novel.chapters && novel.chapters.length > 0) {
      const i18n =
        typeof translations !== "undefined" ? translations[lang] : {};
      const chapterLabel = i18n["label_chapter"] || "Chapter";
      chapterListEl.innerHTML = novel.chapters
        .map((ch) => `<div>${chapterLabel} ${ch.id}: ${ch.title}</div>`)
        .join("");
    } else {
      chapterListEl.innerHTML = `<span class="text-white-50 small">${lang === "ar" ? "لا توجد فصول متاحة" : lang === "es" ? "No hay capítulos disponibles" : "No chapters available"}</span>`;
    }
  }

  renderRelatedNovels(novel, allCategories);
  
  // Initialize author/admin controls
  const userToken = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const userAuthorId = parseInt(localStorage.getItem("authorId") || sessionStorage.getItem("authorId"));

  const authorControls = document.getElementById("authorControls");
  if (authorControls && userToken && (userRole === "Admin" || (userRole === "Author" && userAuthorId === novel.authorId))) {
    authorControls.classList.remove("d-none");
    
    document.getElementById("editNovelBtn").addEventListener("click", () => {
      document.getElementById("editNovelTitle").value = novel.title;
      document.getElementById("editNovelDesc").value = novel.description;
      document.getElementById("editNovelPrice").value = novel.price || 0;
      document.getElementById("editNovelImage").value = novel.imgSrc || "";
      
      const select = document.getElementById("editNovelCategories");
      select.innerHTML = "";
      allCategories.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.text = c.en;
        if (novel.categories && novel.categories.includes(c.id)) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      const modalEl = document.getElementById('editNovelModal');
      if (modalEl) {
        document.body.appendChild(modalEl);
        const editModal = new bootstrap.Modal(modalEl);
        editModal.show();
      } else {
        console.error("Edit modal not found in DOM");
      }
    });

    document.getElementById("editNovelForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const titleEn = document.getElementById("editNovelTitle").value;
      const descriptionEn = document.getElementById("editNovelDesc").value;
      const price = parseFloat(document.getElementById("editNovelPrice").value);
      const imagePath = document.getElementById("editNovelImage").value;
      const cats = Array.from(document.getElementById("editNovelCategories").selectedOptions).map(opt => opt.value);

      try {
        const res = await fetch(`${API_BASE_URL}/api/novels/${novelId}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
            "ngrok-skip-browser-warning": "69420"
          },
          body: JSON.stringify({ titleEn, descriptionEn, price, imagePath, cats })
        });
        
        if (res.ok) {
          alert("Novel updated successfully.");
          location.reload();
        } else {
          let errorMsg = "Unknown error";
          try {
            const data = await res.json();
            errorMsg = data.message || errorMsg;
          } catch (e) {
            errorMsg = await res.text();
          }
          alert(`Failed to update novel: ${errorMsg}`);
        }
      } catch (err) {
        console.error(err);
        alert(`Network error or failure: ${err.message}`);
      }
    });

    document.getElementById("deleteNovelBtn").addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this novel? This action cannot be undone.")) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/novels/${novelId}`, {
            method: "DELETE",
            headers: { 
              "Authorization": `Bearer ${userToken}`,
              "ngrok-skip-browser-warning": "69420"
            }
          });
          if (res.ok) {
            alert("Novel deleted successfully.");
            window.location.href = userRole === "Admin" ? "admin_dashboard.html" : "author_dashboard.html";
          } else {
            alert("Failed to delete novel.");
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  initShareButton(novel);

  const buyBtn = document.querySelector(".buy-btn");
  if (buyBtn) {
    const token =
      localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    
    // Helper to update UI state based on library ownership
    const setOwnershipUI = (status) => {
      // Find the current button in DOM since it might have been cloned
      const currentBtn = document.querySelector(".buy-btn");
      if (!currentBtn) return;
      
      const newBtn = currentBtn.cloneNode(true);
      currentBtn.parentNode.replaceChild(newBtn, currentBtn); // Replace it cleanly
      
      newBtn.removeAttribute("data-bs-toggle");
      newBtn.removeAttribute("data-bs-target");

      // Handle Read Button (if purchased)
      let readBtn = document.querySelector(".read-btn");
      if (status.isPurchased) {
        if (!readBtn) {
          readBtn = document.createElement("button");
          readBtn.className = "btn read-btn ms-2";
          readBtn.innerText = translations[lang].btn_read || "Read Now";
          newBtn.after(readBtn);
        }
      } else {
        if (readBtn) readBtn.remove();
      }

      if (status.inLibrary) {
        newBtn.innerText = { en: "Remove from library", ar: "إزالة من المكتبة", es: "Eliminar de la biblioteca" }[lang] || "Remove from library";
        newBtn.classList.remove("btn-warning", "btn-primary", "btn-success");
        newBtn.classList.add("btn-danger");
        
        newBtn.addEventListener("click", async () => {
          try {
            const delRes = await fetch(`${API_BASE_URL}/api/library/${novelId}`, {
              method: 'DELETE',
              headers: { 
                 'Authorization': `Bearer ${token}`,
                 'ngrok-skip-browser-warning': '69420'
              }
            });
            if (delRes.ok) {
              if (window.showToast) showToast({ en: "Removed from library", ar: "تمت الإزالة من المكتبة", es: "Eliminado de la biblioteca" }[lang] || "Removed from library", "success");
              setOwnershipUI({ isPurchased: true, inLibrary: false });
            }
          } catch(err) { console.error(err); }
        });
      } else if (status.isPurchased && !status.inLibrary) {
        newBtn.innerText = { en: "Add to library", ar: "أضف إلى المكتبة", es: "Añadir a la biblioteca" }[lang] || "Add to library";
        newBtn.classList.remove("btn-danger", "btn-warning");
        newBtn.classList.add("btn-success");
        
        newBtn.addEventListener("click", async () => {
          try {
            const addRes = await fetch(`${API_BASE_URL}/api/library/${novelId}`, {
              method: 'POST',
              headers: { 
                 'Authorization': `Bearer ${token}`,
                 'ngrok-skip-browser-warning': '69420'
              }
            });
            if (addRes.ok) {
              if (window.showToast) showToast({ en: "Added to library", ar: "تمت الإضافة للمكتبة", es: "Añadido a la biblioteca" }[lang] || "Added to library", "success");
              setOwnershipUI({ isPurchased: true, inLibrary: true });
            }
          } catch(err) { console.error(err); }
        });
      } else {
        // Not purchased
        newBtn.innerText = { en: "Buy Now", ar: "اشتري الآن", es: "Comprar ahora" }[lang] || "Buy Now";
        newBtn.classList.remove("btn-danger", "btn-success");
        newBtn.classList.add("btn-warning");
        newBtn.setAttribute("data-bs-toggle", "modal");
        newBtn.setAttribute("data-bs-target", "#paymentModal");
      }
    };

    if (!token) {
      const loginText =
        {
          en: "Login to Buy",
          ar: "سجل الدخول للشراء",
          es: "Iniciar sesión para comprar",
        }[lang] || "Login to Buy";
      buyBtn.innerText = loginText;
      buyBtn.setAttribute("data-bs-toggle", "modal");
      buyBtn.setAttribute("data-bs-target", "#loginModal");
    } else {
      // Check library status
      try {
        const checkRes = await fetch(`${API_BASE_URL}/api/library/check/${novelId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420'
          }
        });
        if (checkRes.ok) {
          const status = await checkRes.json();
          setOwnershipUI(status);
        }
      } catch(err) {
        console.error("Library check failed", err);
      }
    }

    // Payment Form Listener
    const paymentForm = document.getElementById("paymentForm");
    if (paymentForm && token) {
      paymentForm.onsubmit = async (e) => {
        e.preventDefault();
        try {
          const pmRes = await fetch(`${API_BASE_URL}/api/library/${novelId}`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'ngrok-skip-browser-warning': '69420'
            }
          });
          if (pmRes.ok) {
            const modalEl = document.getElementById('paymentModal');
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
            
            // Clean up backdrop
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();

            if (window.showToast) showToast({ en: "Added to library!", ar: "تمت الإضافة للمكتبة!", es: "¡Añadido a la biblioteca!" }[lang] || "Added to library!", "success");
            setOwnershipUI({ isPurchased: true, inLibrary: true });
          } else {
             if (window.showToast) showToast("Failed to purchase.", "error");
          }
        } catch(err) { console.error(err); }
      };
    }
  }
}

function initShareButton(novel) {
  const shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  const newShareBtn = shareBtn.cloneNode(true);
  shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);

  newShareBtn.addEventListener("click", async () => {
    const title = novel.title;
    const text = `Check out "${title}" on NextPage!`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (_) {}
    } else {
      navigator.clipboard.writeText(url).then(() => {
        if (window.showToast) {
          const msg =
            {
              en: "Link copied to clipboard!",
              ar: "تم نسخ الرابط!",
              es: "¡Enlace copiado!",
            }[getActiveLang()] || "Link copied!";
          showToast(msg);
        }
      });
    }
  });
}

async function renderRelatedNovels(currentNovel, allCategories) {
  const slider = document.getElementById("relatedNovelsSlider");
  if (!slider) return;

  let allNovels = [];
  try {
    allNovels = await fetchNovels();
  } catch (_) {
    return;
  }

  const related = allNovels
    .filter(
      (n) =>
        n.id !== currentNovel.id &&
        n.categories.some((cat) => currentNovel.categories.includes(cat)),
    )
    .slice(0, 6);

  if (related.length > 0) {
    slider.innerHTML = related
      .map((n) => createNovelCard(n, allCategories))
      .join("");
  } else {
    slider.innerHTML = `<p class="text-white-50">No similar novels found.</p>`;
  }
}

async function loadReviews(novelId) {
  const reviewsList = document.getElementById("reviewsList");
  if (!reviewsList) return;
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";
  
  const userToken = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  let currentUserId = null;
  let currentUserRole = null;
  let currentUserAuthorId = null;
  
  if (userToken && userToken.split('.').length === 3) {
    try {
      const base64Url = userToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      currentUserId = payload.id;
      currentUserRole = payload.role;
      currentUserAuthorId = payload.authorId;
    } catch(e) {
      console.error("Token decoding failed", e);
    }
  }
  
  const canDelete = (r) => {
    if (!userToken) return false;
    if (currentUserRole === 'Admin') return true;
    if (r.UserId == currentUserId) return true;
    if (currentUserAuthorId && currentUserAuthorId == r.NovelAuthorId) return true;
    return false;
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/reviews/${novelId}`, {
         headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    if (res.ok) {
      const reviews = await res.json();
      if (reviews.length > 0) {
        reviewsList.innerHTML = reviews.map(r => `
          <div class="mb-3 border-bottom border-secondary pb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold text-white"><i class="bi bi-person-circle me-1"></i> ${r.Username}</span>
              <div class="d-flex align-items-center gap-2">
                <span class="text-white-50 small">${new Date(r.DatePosted).toLocaleDateString()}</span>
                ${canDelete(r) ? `<button class="btn btn-sm btn-link text-danger p-0 ms-2 delete-review-btn" data-id="${r.Id}"><i class="bi bi-trash"></i></button>` : ''}
              </div>
            </div>
            <div class="text-warning small mb-2">
              ${'<i class="bi bi-star-fill"></i>'.repeat(r.Rating)}${'<i class="bi bi-star"></i>'.repeat(5 - r.Rating)}
            </div>
            <p class="text-light mb-0" style="font-size: 0.95rem;">${r.Comment || ''}</p>
          </div>
        `).join("");

        // Attach event listeners for delete buttons
        document.querySelectorAll(".delete-review-btn").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            const reviewId = e.currentTarget.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this comment?")) {
              try {
                const delRes = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
                  method: "DELETE",
                  headers: { 
                    "Authorization": `Bearer ${userToken}`,
                    "ngrok-skip-browser-warning": "69420"
                  }
                });
                if (delRes.ok) {
                  location.reload();
                } else {
                  alert("Failed to delete review.");
                }
              } catch(err) {
                console.error(err);
              }
            }
          });
        });
      } else {
        reviewsList.innerHTML = `<p class="text-white-50 small">${lang === 'ar' ? 'لا توجد مراجعات بعد.' : lang === 'es' ? 'No hay reseñas todavía.' : 'No reviews yet. Be the first to share your thoughts!'}</p>`;
      }
    }
  } catch (err) {
    console.error("Failed to load reviews", err);
  }
}

function initRatingSystem(novelId) {
  const stars = document.querySelectorAll(".review-star");
  const submitBtn = document.getElementById("submitReviewBtn");
  let selectedRating = 0;

  if (stars.length === 0) return;

  stars.forEach((star) => {
    star.addEventListener("mouseover", () =>
      highlightStars(parseInt(star.dataset.rating)),
    );
    star.addEventListener("mouseout", () => highlightStars(selectedRating));
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.rating);
      highlightStars(selectedRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach((s) => {
      const sRating = parseInt(s.dataset.rating);
      if (sRating <= rating) s.classList.replace("bi-star", "bi-star-fill");
      else s.classList.replace("bi-star-fill", "bi-star");
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
      const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";
      
      if (!token) {
        if (window.showToast) {
           const loginMsg = { en: "Please login to review!", ar: "يرجى تسجيل الدخول للتقييم!", es: "¡Inicia sesión para opinar!" }[lang] || "Please login to review!";
           showToast(loginMsg, "error");
        }
        
        // Show login modal if it exists
        const loginModalEl = document.getElementById("loginModal");
        if (loginModalEl) {
           const loginModal = bootstrap.Modal.getInstance(loginModalEl) || new bootstrap.Modal(loginModalEl);
           loginModal.show();
        }
        return;
      }
      
      if (selectedRating === 0) {
        if (window.showToast) showToast({ en: "Please select a rating!", ar: "يرجى اختيار تقييم!", es: "¡Por favor selecciona una calificación!" }[lang] || "Please select a rating!", "error");
        return;
      }
      
      const comment = document.getElementById("reviewText").value;
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "...";
      
      try {
        const res = await fetch(`${API_BASE_URL}/api/reviews/${novelId}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420'
          },
          body: JSON.stringify({ rating: selectedRating, comment })
        });
        
        if (res.ok) {
          if (window.showToast) {
            const msg = { en: "Review submitted!", ar: "تم إرسال المراجعة!", es: "¡Reseña enviada!" }[lang] || "Review submitted!";
            showToast(msg, "success");
          }
          document.getElementById("reviewText").value = "";
          selectedRating = 0;
          highlightStars(0);
          
          await loadReviews(novelId);
        } else {
             if (window.showToast) showToast({ en: "Failed to submit", ar: "فشل الإرسال", es: "Error al enviar" }[lang] || "Failed to submit", "error");
        }
      } catch(err) {
         console.error(err);
      } finally {
         submitBtn.innerText = originalText;
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const novelId = parseInt(params.get("id"));
  if (novelId) {
    initRatingSystem(novelId);
    loadReviews(novelId);
  }
});

window.renderNovelDetails = renderNovelDetails;
