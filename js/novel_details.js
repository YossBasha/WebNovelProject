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

    document.title = `${title} - NextPage`;

    const imgEl = document.querySelector(".image-section img");
    if (imgEl) imgEl.src = novel.imgSrc;

    const titleEl = document.querySelector(".novel-title");
    if (titleEl) titleEl.textContent = title;

    const authorEl = document.getElementById("authorLink");
    if (authorEl) {
      // Localized "by" could be added to i18n.js, but for now we'll keep it simple or look for data-i18n
      // Better: Use a translation key for "by {{author}}"
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
        const chapterLabel = translations[lang]["label_chapter"] || "Chapter";
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

document.addEventListener("DOMContentLoaded", renderNovelDetails);
window.renderNovelDetails = renderNovelDetails;
