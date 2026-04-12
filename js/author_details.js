document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const authorId = parseInt(params.get("id"));

  if (isNaN(authorId)) return;

  const author = mockDB.authors.find((a) => a.id === authorId);

  if (!author) {
    const nameEl = document.getElementById("authorName");
    if (nameEl) nameEl.textContent = "Author Not Found";
    return;
  }

  document.title = `${author.name} - NextPage`;

  const avatarEl = document.getElementById("authorAvatar");
  if (avatarEl) {
    avatarEl.src = author.image;
    avatarEl.alt = author.name;
  }
  
  const nameEl = document.getElementById("authorName");
  if (nameEl) nameEl.textContent = author.name;
  
  const bioEl = document.getElementById("authorBio");
  if (bioEl) bioEl.textContent = author.bio;

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
    const genres = [...new Set(authorNovels.flatMap((n) => n.categories))];
    genresEl.innerHTML = genres
      .map((g) => `<span class="author-profile-genre-pill">${g}</span>`)
      .join("");
  }

  const grid = document.getElementById("authorNovelsGrid");
  const noNovelsMsg = document.getElementById("noNovelsMsg");

  if (grid) {
    if (authorNovels.length === 0) {
      if (noNovelsMsg) noNovelsMsg.classList.remove("d-none");
    } else {
      if (noNovelsMsg) noNovelsMsg.classList.add("d-none");
      grid.innerHTML = authorNovels.map((novel) => `
        <div class="col-6 col-md-4 col-lg-3">
          <a href="novel_details.html?id=${novel.id}" class="text-decoration-none">
            <div class="author-novel-card">
              <div class="author-novel-img-wrap">
                <img src="${novel.imgSrc}" alt="${novel.title}" />
                <div class="author-novel-overlay">
                  <span class="author-novel-rating">
                    <i class="bi bi-star-fill text-warning"></i> ${novel.rating}
                  </span>
                </div>
                ${novel.isBestSeller ? '<span class="author-novel-badge">Bestseller</span>' : ""}
              </div>
              <div class="author-novel-body">
                <h6 class="author-novel-title">${novel.title}</h6>
                <p class="author-novel-cats">${novel.categories.join(" · ")}</p>
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
      `).join("");
    }
  }
});
