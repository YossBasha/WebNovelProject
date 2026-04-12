async function renderAuthors() {
  const authorsGrid = document.getElementById("authorsGrid");
  if (!authorsGrid) return;

  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  let currentPage = 0;
  const pageSize = 24;
  let allAuthors = [];
  let isLoading = false;
  let hasMore = true;

  // Let's grab all categories once so we can quickly translate their IDs
  let allCategories = [];
  try {
    allCategories = await fetchCategories();
  } catch (err) {
    console.error("Authors: Failed to load categories", err);
  }

  async function loadMore(reset = false) {
    if (isLoading || (!hasMore && !reset)) return;
    isLoading = true;

    if (reset) {
      currentPage = 0;
      allAuthors = [];
      hasMore = true;
      if (authorsGrid) authorsGrid.innerHTML = "";
    }

    try {
      const newAuthors = await fetchAuthors(pageSize, currentPage * pageSize);

      if (newAuthors.length < pageSize) {
        hasMore = false;
      }

      allAuthors = [...allAuthors, ...newAuthors];
      renderGrid(newAuthors, !reset);
      currentPage++;

      // Toggle "Load More" button visibility
      let loadMoreBtn = document.getElementById("loadMoreAuthorsBtn");
      if (loadMoreBtn) {
        if (!hasMore) loadMoreBtn.classList.add("d-none");
        else loadMoreBtn.classList.remove("d-none");
      }
    } catch (err) {
      console.error("Authors: Failed to load authors", err);
      if (authorsGrid && reset)
        authorsGrid.innerHTML = `<p class="text-danger">Failed to load authors. Is the server running?</p>`;
    } finally {
      isLoading = false;
    }
  }

  function renderGrid(authorsToAppend, append) {
    const authorsHTML = authorsToAppend
      .map((author) => {
        const novelCount = author.novelCount || 0;
        let novelText = novelCount === 1 ? "novel" : "novels";
        if (lang === "ar") novelText = "رواية";
        else if (lang === "es")
          novelText = novelCount === 1 ? "novela" : "novelas";

        const genres = author.categories
          .slice(0, 3)
          .map((catId) => {
            const cat = allCategories.find((c) => c.id === catId);
            const catName = cat ? cat[lang] || cat.en : catId;
            return `<span class="author-genre-tag">${catName}</span>`;
          })
          .join("");

        const imgSrc = author.image
          ? author.image.startsWith("http")
            ? author.image
            : `${API_BASE_URL}/${author.image}`
          : "imgs/placeholder.webp";

        return `
        <div class="col reveal-on-scroll">
          <a href="author_details.html?id=${author.id}" class="text-decoration-none">
            <div class="author-card">
              <div class="author-card-img-wrap">
                <img src="${imgSrc}" onerror="this.src='./imgs/placeholder.webp'" alt="${author.name}" />
                <div class="author-card-overlay">
                  <span class="author-novel-count">
                    <i class="bi bi-book"></i> ${novelCount} ${novelText}
                  </span>
                </div>
              </div>
              <div class="author-card-body">
                <h5 class="author-card-name text-truncate">${author.name}</h5>
                <p class="author-card-bio" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${author.bio || "An amazing author with a collection of great stories."}</p>
                <div class="author-genre-tags">${genres}</div>
              </div>
            </div>
          </a>
        </div>
      `;
      })
      .join("");

    if (append) authorsGrid.insertAdjacentHTML("beforeend", authorsHTML);
    else authorsGrid.innerHTML = authorsHTML;

    if (window.initScrollReveal) window.initScrollReveal();
  }

  // Load More Button creation (only if it doesn't exist)
  let loadMoreBtn = document.getElementById("loadMoreAuthorsBtn");
  if (!loadMoreBtn && authorsGrid) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "text-center my-5 w-100";
    btnContainer.innerHTML = `<button id="loadMoreAuthorsBtn" class="btn btn-outline-primary px-5 py-2 glass-effect rounded-pill">Load More</button>`;
    authorsGrid.parentElement.appendChild(btnContainer);
    loadMoreBtn = document.getElementById("loadMoreAuthorsBtn");
    loadMoreBtn.addEventListener("click", () => loadMore(false));
  }

  // Initial Load
  loadMore(true);
}

document.addEventListener("DOMContentLoaded", renderAuthors);
window.renderAuthors = renderAuthors;
