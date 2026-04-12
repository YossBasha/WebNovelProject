function renderAuthors() {
  const authorsGrid = document.getElementById("authorsGrid");
  if (!authorsGrid) return;

  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  authorsGrid.innerHTML = mockDB.authors
    .map((author) => {
      const authorName = getTranslation(author, "name");
      const authorBio = getTranslation(author, "bio");

      // Count how many novels this author has written
      const novels = mockDB.novels.filter((n) => n.authorId === author.id);
      const novelCount = novels.length;

      // Localized "novel/novels"
      let novelText = "novels";
      if (lang === "ar") {
          novelText = novelCount === 1 ? "رواية" : "رواية"; // Simplified for Arabic UI in count
      } else if (lang === "es") {
          novelText = novelCount === 1 ? "novela" : "novelas";
      } else {
          novelText = novelCount === 1 ? "novel" : "novels";
      }

      // Collect unique categories across all their novels
      const genres = [
        ...new Set(novels.flatMap((n) => n.categories)),
      ]
        .slice(0, 3)
        .map((catId) => {
          const cat = mockDB.categories.find(c => c.id === catId);
          const catName = cat ? (cat[lang] || cat.en) : catId;
          return `<span class="author-genre-tag">${catName}</span>`;
        })
        .join("");

      return `
        <div class="col">
          <a href="author_details.html?id=${author.id}" class="text-decoration-none">
            <div class="author-card">
              <div class="author-card-img-wrap">
                <img src="${author.image}" alt="${authorName}" />
                <div class="author-card-overlay">
                  <span class="author-novel-count">
                    <i class="bi bi-book"></i> ${novelCount} ${novelText}
                  </span>
                </div>
              </div>
              <div class="author-card-body">
                <h5 class="author-card-name">${authorName}</h5>
                <p class="author-card-bio">${authorBio}</p>
                <div class="author-genre-tags">${genres}</div>
              </div>
            </div>
          </a>
        </div>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderAuthors);
window.renderAuthors = renderAuthors;
