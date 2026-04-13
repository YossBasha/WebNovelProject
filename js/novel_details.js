async function renderNovelDetails() {
  const params = new URLSearchParams(window.location.search);
  const novelId = parseInt(params.get("id"));
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  if (!novelId) return;

  let novel;
  try {
    const res = await fetch(`${API_BASE_URL}/api/novels/${novelId}`, {
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
  initShareButton(novel);

  const buyBtn = document.querySelector(".buy-btn");
  if (buyBtn) {
    const token =
      localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
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

function initRatingSystem() {
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
    submitBtn.addEventListener("click", () => {
      if (selectedRating === 0) {
        if (window.showToast) showToast("Please select a rating!", "error");
        return;
      }
      if (window.showToast) {
        const msg =
          {
            en: "Review submitted!",
            ar: "تم إرسال المراجعة!",
            es: "¡Reseña enviada!",
          }[getActiveLang()] || "Review submitted!";
        showToast(msg, "success");
      }
      document.getElementById("reviewText").value = "";
      selectedRating = 0;
      highlightStars(0);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initRatingSystem();
});

window.renderNovelDetails = renderNovelDetails;
