function renderAuthorDetails() {
  const params = new URLSearchParams(window.location.search);
  const authorId = parseInt(params.get("id"));

  if (isNaN(authorId)) return;

  const author = mockDB.authors.find((a) => a.id === authorId);
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  if (!author) {
    const nameEl = document.getElementById("authorName");
    if (nameEl) nameEl.textContent = lang === "ar" ? "المؤلف غير موجود" : (lang === "es" ? "Autor no encontrado" : "Author Not Found");
    return;
  }

  const authorName = getTranslation(author, "name");
  const authorBio = getTranslation(author, "bio");

  document.title = `${authorName} - NextPage`;

  const avatarEl = document.getElementById("authorAvatar");
  if (avatarEl) {
    avatarEl.src = author.image;
    avatarEl.alt = authorName;
  }
  
  const nameEl = document.getElementById("authorName");
  if (nameEl) nameEl.textContent = authorName;
  
  const bioEl = document.getElementById("authorBio");
  if (bioEl) bioEl.textContent = authorBio;

  const authorNovels = mockDB.novels.filter((n) => n.authorId === author.id);

  const totalViews = authorNovels.reduce((sum, n) => sum + n.views, 0);
  const avgRating = authorNovels.length
    ? (authorNovels.reduce((sum, n) => sum + n.rating, 0) / authorNovels.length).toFixed(1)
    : "—";

  const statNovels = document.getElementById("statNovels");
  if (statNovels) statNovels.textContent = authorNovels.length;
  
  const statViews = document.getElementById("statViews");
  if (statViews) {
    statViews.textContent = totalViews >= 1000
      ? (totalViews / 1000).toFixed(1) + "k"
      : totalViews;
  }
  
  const statRating = document.getElementById("statRating");
  if (statRating) statRating.textContent = avgRating;

  const genresEl = document.getElementById("authorGenres");
  if (genresEl) {
    const uniqueCatIds = [...new Set(authorNovels.flatMap((n) => n.categories))];
    genresEl.innerHTML = uniqueCatIds
      .map((catId) => {
          const cat = mockDB.categories.find(c => c.id === catId);
          const catName = cat ? (cat[lang] || cat.en) : catId;
          return `<span class="author-profile-genre-pill">${catName}</span>`;
      })
      .join("");
  }

  const grid = document.getElementById("authorNovelsGrid");
  const noNovelsMsg = document.getElementById("noNovelsMsg");

  if (grid) {
    if (authorNovels.length === 0) {
      if (noNovelsMsg) noNovelsMsg.classList.remove("d-none");
    } else {
      if (noNovelsMsg) noNovelsMsg.classList.add("d-none");
      grid.innerHTML = authorNovels.map((novel) => {
        const title = getTranslation(novel, "title");
        const cats = novel.categories.map(catId => {
            const cat = mockDB.categories.find(c => c.id === catId);
            return cat ? (cat[lang] || cat.en) : catId;
        }).join(" · ");
        const bestsellerText = { en: "Bestseller", ar: "الأكثر مبيعاً", es: "Más vendido" }[lang] || "Bestseller";

        return `
        <div class="col-6 col-md-4 col-lg-3">
          <a href="novel_details.html?id=${novel.id}" class="text-decoration-none">
            <div class="author-novel-card">
              <div class="author-novel-img-wrap">
                <img src="${novel.imgSrc}" alt="${title}" />
                <div class="author-novel-overlay">
                  <span class="author-novel-rating">
                    <i class="bi bi-star-fill text-warning"></i> ${novel.rating}
                  </span>
                </div>
                ${novel.isBestSeller ? `<span class="author-novel-badge">${bestsellerText}</span>` : ""}
              </div>
              <div class="author-novel-body">
                <h6 class="author-novel-title">${title}</h6>
                <p class="author-novel-cats">${cats}</p>
                <div class="author-novel-footer">
                  <span class="author-novel-price">$${novel.price.toFixed(2)}</span>
                  <span class="author-novel-views">
                    <i class="bi bi-eye"></i> ${novel.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      `;
      }).join("");
    }
  }
}

document.addEventListener("DOMContentLoaded", renderAuthorDetails);
window.renderAuthorDetails = renderAuthorDetails;
