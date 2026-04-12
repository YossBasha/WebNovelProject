function renderNovelDetails() {
  const params = new URLSearchParams(window.location.search);
  const novelId = parseInt(params.get("id"));

  if (!novelId || typeof mockDB === "undefined") return;

  const novel = mockDB.novels.find((n) => n.id === novelId);
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  if (novel) {
    const author = mockDB.authors.find((a) => a.id === novel.authorId);
    const authorName = author ? getTranslation(author, "name") : "Unknown Author";
    const title = getTranslation(novel, "title");
    const description = getTranslation(novel, "description");

    // Dynamic SEO update
    document.title = `${title} - NextPage`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description.substring(0, 160) + "...");

    const imgEl = document.querySelector(".image-section img");
    if (imgEl) imgEl.src = novel.imgSrc;

    const titleEl = document.querySelector(".novel-title");
    if (titleEl) titleEl.textContent = title;

    const authorEl = document.getElementById("authorLink");
    if (authorEl) {
      const byPrefix = { en: "by", ar: "بواسطة", es: "por" }[lang] || "by";
      authorEl.textContent = `${byPrefix} ${authorName}`;
      if (author) {
        authorEl.href = `author_details.html?id=${author.id}`;
      }
    }

    const chipsEl = document.getElementById("categoryChips");
    if (chipsEl) {
      chipsEl.innerHTML = novel.categories
        .map((catId) => {
          const cat = mockDB.categories.find(c => c.id === catId);
          const catName = cat ? (cat[lang] || cat.en) : catId;
          return `<a href="discover.html?category=${encodeURIComponent(cat ? cat.id : catId)}" class="category-chip">${catName}</a>`;
        })
        .join("");
    }

    const descEl = document.querySelector(".description");
    if (descEl) descEl.textContent = description;

    const ratingEl = document.querySelector(".rating-value");
    if (ratingEl) ratingEl.textContent = novel.rating;

    const priceEl = document.querySelector(".novel-price");
    if (priceEl) {
      priceEl.textContent = novel.price ? `$${novel.price.toFixed(2)}` : "Free";
    }

    // Render Chapters
    const chapterListEl = document.getElementById("chapterList");
    if (chapterListEl) {
      if (novel.chapters && novel.chapters.length > 0) {
        const i18n = typeof translations !== "undefined" ? translations[lang] : {};
        const chapterLabel = i18n["label_chapter"] || "Chapter";
        chapterListEl.innerHTML = novel.chapters
          .map((ch) => {
            const chTitle = ch[lang] || ch.en;
            return `<div>${chapterLabel} ${ch.id}: ${chTitle}</div>`;
          })
          .join("");
      } else {
        chapterListEl.innerHTML = `<span class="text-white-50 small">${lang === "ar" ? "لا توجد فصول متاحة" : (lang === "es" ? "No hay capítulos disponibles" : "No chapters available")}</span>`;
      }
    }

    renderRelatedNovels(novel);
    initShareButton(novel);
  } else {
    const titleEl = document.querySelector(".novel-title");
    if (titleEl) titleEl.innerText = lang === "ar" ? "الرواية غير موجودة" : (lang === "es" ? "Novela no encontrada" : "Novel Not Found");
    const descEl = document.querySelector(".description");
    if (descEl) descEl.innerText = lang === "ar" ? "هذا الكتاب غير موجود في قاعدة بياناتنا." : (lang === "es" ? "Este libro no existe en nuestra base de datos." : "This book does not exist in our database.");
  }

  const buyBtn = document.querySelector(".buy-btn");
  if (buyBtn) {
    const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    if (!token) {
      const loginText = { en: "Login to Buy", ar: "سجل الدخول للشراء", es: "Iniciar sesión para comprar" }[lang] || "Login to Buy";
      buyBtn.innerText = loginText;
      buyBtn.setAttribute("data-bs-toggle", "modal");
      buyBtn.setAttribute("data-bs-target", "#loginModal");
    }
  }
}

function initShareButton(novel) {
  const shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  // Remove existing listeners to prevent duplicates if called multiple times (though shouldn't be now)
  const newShareBtn = shareBtn.cloneNode(true);
  shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);

  newShareBtn.addEventListener("click", async () => {
    const title = getTranslation(novel, "title");
    const text = `Check out "${title}" on NextPage!`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url).then(() => {
        if (window.showToast) {
            const msg = { en: "Link copied to clipboard!", ar: "تم نسخ الرابط!", es: "¡Enlace copiado!" }[getActiveLang()] || "Link copied!";
            showToast(msg);
        }
      });
    }
  });
}

function renderRelatedNovels(currentNovel) {
  const slider = document.getElementById("relatedNovelsSlider");
  if (!slider) return;

  const related = mockDB.novels.filter(n => 
    n.id !== currentNovel.id && 
    n.categories.some(cat => currentNovel.categories.includes(cat))
  ).slice(0, 6);

  if (related.length > 0) {
    slider.innerHTML = related.map(n => createNovelCard(n)).join("");
  } else {
    slider.innerHTML = `<p class="text-white-50">No similar novels found.</p>`;
  }
}

function initRatingSystem() {
  const stars = document.querySelectorAll(".review-star");
  const submitBtn = document.getElementById("submitReviewBtn");
  let selectedRating = 0;

  if (stars.length === 0) return;

  stars.forEach(star => {
    star.addEventListener("mouseover", () => {
      const rating = parseInt(star.dataset.rating);
      highlightStars(rating);
    });

    star.addEventListener("mouseout", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.rating);
      highlightStars(selectedRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(s => {
      const sRating = parseInt(s.dataset.rating);
      if (sRating <= rating) {
        s.classList.replace("bi-star", "bi-star-fill");
      } else {
        s.classList.replace("bi-star-fill", "bi-star");
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const text = document.getElementById("reviewText").value;
      if (selectedRating === 0) {
        if (window.showToast) showToast("Please select a rating!", "error");
        return;
      }
      
      // Mock submission
      if (window.showToast) {
        const msg = { en: "Review submitted!", ar: "تم إرسال المراجعة!", es: "¡Reseña enviada!" }[getActiveLang()] || "Review submitted!";
        showToast(msg, "success");
      }
      document.getElementById("reviewText").value = "";
      selectedRating = 0;
      highlightStars(0);
    });
  }
}

// Initial single run for one-time event listeners
document.addEventListener("DOMContentLoaded", () => {
    initRatingSystem();
    // renderNovelDetails is called via i18n.js changeLanguage on load
});

window.renderNovelDetails = renderNovelDetails;
