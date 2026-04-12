document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get("category") || "All";
  const initialQuery = params.get("q") || "";

  const discoverGrid = document.getElementById("discoverGrid");
  const searchInput = document.getElementById("discoverSearch");
  const filterPillsEl = document.getElementById("filterPills");
  const noResultsMsg = document.getElementById("noResultsMsg");
  const headingEl = document.getElementById("discoverHeading");

  if (!discoverGrid) return;

  if (initialQuery) {
    searchInput.value = initialQuery;
  }

  const allCategories = ["All", ...mockDB.categories.map(c => c.name)];

  function renderPills() {
    filterPillsEl.innerHTML = allCategories.map(cat => `
      <button
        class="discover-pill ${cat === activeCategory ? "active" : ""}"
        data-category="${cat}"
      >${cat}</button>
    `).join("");

    filterPillsEl.querySelectorAll(".discover-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        renderPills();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const query = searchInput.value.trim().toLowerCase();

    const filtered = mockDB.novels.filter(novel => {
      const matchesCat = activeCategory === "All" ||
        novel.categories.includes(activeCategory);
      const authorName = getAuthorName(novel.authorId).toLowerCase();
      const matchesSearch = !query ||
        novel.title.toLowerCase().includes(query) ||
        authorName.includes(query);
      return matchesCat && matchesSearch;
    });

    if (activeCategory !== "All") {
      headingEl.textContent = activeCategory;
    } else {
      headingEl.textContent = "Discover Novels";
    }

    if (filtered.length === 0) {
      discoverGrid.innerHTML = "";
      noResultsMsg.classList.remove("d-none");
    } else {
      noResultsMsg.classList.add("d-none");
      discoverGrid.innerHTML = filtered.map(novel => `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
          <a href="novel_details.html?id=${novel.id}" class="text-decoration-none">
            <div class="discover-novel-card">
              <div class="discover-card-img-wrap">
                <img src="${novel.imgSrc}" alt="${novel.title}" />
                <div class="discover-card-overlay">
                  <span class="discover-rating">
                    <i class="bi bi-star-fill text-warning"></i> ${novel.rating}
                  </span>
                </div>
              </div>
              <div class="discover-card-body">
                <h6 class="discover-card-title">${novel.title}</h6>
                <p class="discover-card-author">
                  <i class="bi bi-pen"></i> ${getAuthorName(novel.authorId)}
                </p>
                <div class="discover-card-tags">
                  ${novel.categories.map(c => `<span class="discover-tag">${c}</span>`).join("")}
                </div>
              </div>
            </div>
          </a>
        </div>
      `).join("");
    }
  }

  searchInput.addEventListener("input", renderGrid);
  renderPills();
  renderGrid();
});
