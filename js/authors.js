// ── Render the Authors Grid from mockDB ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const authorsGrid = document.getElementById("authorsGrid");
  if (!authorsGrid) return;

  authorsGrid.innerHTML = mockDB.authors
    .map((author) => {
      // Count how many novels this author has written
      const novelCount = mockDB.novels.filter(
        (n) => n.authorId === author.id
      ).length;

      // Collect unique categories across all their novels
      const genres = [
        ...new Set(
          mockDB.novels
            .filter((n) => n.authorId === author.id)
            .flatMap((n) => n.categories)
        ),
      ]
        .slice(0, 3)
        .map((g) => `<span class="author-genre-tag">${g}</span>`)
        .join("");

      return `
        <div class="col">
          <a href="author_details.html?id=${author.id}" class="text-decoration-none">
            <div class="author-card">
              <div class="author-card-img-wrap">
                <img src="${author.image}" alt="${author.name}" />
                <div class="author-card-overlay">
                  <span class="author-novel-count">
                    <i class="bi bi-book"></i> ${novelCount} novel${novelCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div class="author-card-body">
                <h5 class="author-card-name">${author.name}</h5>
                <p class="author-card-bio">${author.bio}</p>
                <div class="author-genre-tags">${genres}</div>
              </div>
            </div>
          </a>
        </div>
      `;
    })
    .join("");
});
