async function renderAuthorDetails() {
  const params = new URLSearchParams(window.location.search);
  const authorId = parseInt(params.get("id"));
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  if (isNaN(authorId)) return;

  let author;
  try {
    const res = await fetch(`${API_BASE_URL}/api/novels/${novelId}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    if (!res.ok) throw new Error("Author not found");
    author = await res.json();
  } catch (err) {
    const nameEl = document.getElementById("authorName");
    if (nameEl)
      nameEl.textContent =
        lang === "ar"
          ? "المؤلف غير موجود"
          : lang === "es"
            ? "Autor no encontrado"
            : "Author Not Found";
    return;
  }

  document.title = `${author.name} - NextPage`;

  const nameEl = document.getElementById("authorName");
  if (nameEl) nameEl.textContent = author.name;

  const bioEl = document.getElementById("authorBio");
  if (bioEl) bioEl.textContent = author.bio || "";

  const novels = author.novels || [];
  const totalViews = novels.reduce((sum, n) => sum + (n.views || 0), 0);
  const avgRating = novels.length
    ? (
        novels.reduce((sum, n) => sum + (n.rating || 0), 0) / novels.length
      ).toFixed(1)
    : "—";

  const statNovels = document.getElementById("statNovels");
  if (statNovels) statNovels.textContent = novels.length;

  const statViews = document.getElementById("statViews");
  if (statViews) {
    if (totalViews >= 1000000) {
      statViews.textContent = (totalViews / 1000000).toFixed(1) + "m";
    } else if (totalViews >= 1000) {
      statViews.textContent = (totalViews / 1000).toFixed(1) + "k";
    } else {
      statViews.textContent = totalViews;
    }
  }

  const statRating = document.getElementById("statRating");
  if (statRating) statRating.textContent = avgRating;

  // Genre pills
  let allCategories = [];
  try {
    allCategories = await fetchCategories();
  } catch (_) {}

  const genresEl = document.getElementById("authorGenres");
  if (genresEl) {
    const uniqueCatIds = [...new Set(novels.flatMap((n) => n.categories))];
    genresEl.innerHTML = uniqueCatIds
      .map((catId) => {
        const cat = allCategories.find((c) => c.id === catId);
        const catName = cat ? cat[lang] || cat.en : catId;
        return `<span class="author-profile-genre-pill">${catName}</span>`;
      })
      .join("");
  }

  // Novels grid
  const grid = document.getElementById("authorNovelsGrid");
  const noNovelsMsg = document.getElementById("noNovelsMsg");

  if (grid) {
    if (novels.length === 0) {
      if (noNovelsMsg) noNovelsMsg.classList.remove("d-none");
    } else {
      if (noNovelsMsg) noNovelsMsg.classList.add("d-none");
      const bestsellerText =
        { en: "Bestseller", ar: "الأكثر مبيعاً", es: "Más vendido" }[lang] ||
        "Bestseller";

      grid.innerHTML = novels
        .map((novel) => {
          const cats = novel.categories
            .map((catId) => {
              const cat = allCategories.find((c) => c.id === catId);
              return cat ? cat[lang] || cat.en : catId;
            })
            .join(" · ");

          const imgSrc = novel.imgSrc
            ? novel.imgSrc.startsWith("http")
              ? novel.imgSrc
              : `${API_BASE_URL}/${novel.imgSrc}`
            : "";

          return `
        <div class="col-6 col-md-4 col-lg-3">
          <a href="novel_details.html?id=${novel.id}" class="text-decoration-none">
            <div class="author-novel-card">
              <div class="author-novel-img-wrap">
                <img src="${imgSrc}" alt="${novel.title}" />
                <div class="author-novel-overlay">
                  <span class="author-novel-rating">
                    <i class="bi bi-star-fill text-warning"></i> ${novel.rating}
                  </span>
                </div>
                ${novel.isBestSeller ? `<span class="author-novel-badge">${bestsellerText}</span>` : ""}
              </div>
              <div class="author-novel-body">
                <h6 class="author-novel-title">${novel.title}</h6>
                <p class="author-novel-cats">${cats}</p>
                <div class="author-novel-footer">
                  <span class="author-novel-price">$${parseFloat(novel.price).toFixed(2)}</span>
                  <span class="author-novel-views"><i class="bi bi-eye"></i> ${(novel.views || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </a>
        </div>`;
        })
        .join("");
    }
  }
}

document.addEventListener("DOMContentLoaded", renderAuthorDetails);
window.renderAuthorDetails = renderAuthorDetails;
