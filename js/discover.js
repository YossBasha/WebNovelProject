function renderDiscoverPage() {
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get("category") || "All";
  const initialQuery = params.get("q") || "";
  let currentSort = "random"; // Default sort: Randomly Shuffled

  const discoverGrid = document.getElementById("discoverGrid");
  const searchInput = document.getElementById("discoverSearch");
  const filterPillsEl = document.getElementById("filterPills");
  const noResultsMsg = document.getElementById("noResultsMsg");
  const headingEl = document.getElementById("discoverHeading");
  const sortBtn = document.getElementById("sortDropdown");
  const activeSortLabel = document.getElementById("activeSortLabel");

  if (!discoverGrid) return;
  
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  if (initialQuery && !searchInput.dataset.initialized) {
    searchInput.value = initialQuery;
    searchInput.dataset.initialized = "true";
  }

  // Categories now have IDs and localized names
  const allCategories = [{ id: "All", en: "All", ar: "الكل", es: "Todo" }, ...mockDB.categories];

  function renderPills() {
    filterPillsEl.innerHTML = allCategories.map(cat => {
      const catName = cat[lang] || cat.en;
      const catId = cat.id;
      return `
        <button
          class="discover-pill ${catId === activeCategory ? "active" : ""}"
          data-category="${catId}"
        >${catName}</button>
      `;
    }).join("");

    filterPillsEl.querySelectorAll(".discover-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        renderPills();
        renderGrid();
      });
    });
  }

  function updateSortUI() {
    if (!sortBtn || !activeSortLabel) return;
    
    // Update active state in dropdown
    document.querySelectorAll(".sort-dropdown .dropdown-item").forEach(item => {
      item.classList.toggle("active", item.getAttribute("data-sort") === currentSort);
    });

    // Update button label: "Sort By: {{Selected}}"
    const sortKeys = {
      random: "sort_random",
      recently: "sort_recently",
      popular: "sort_popular",
      rating: "sort_rating"
    };
    
    const sortText = translations[lang][sortKeys[currentSort]] || currentSort;
    const sortByText = translations[lang]["sort_by"] || "Sort By";
    
    activeSortLabel.textContent = `${sortByText}: ${sortText}`;
  }

  function renderGrid() {
    const query = searchInput.value.trim().toLowerCase();

    // 1. Filter
    let filtered = mockDB.novels.filter(novel => {
      const matchesCat = activeCategory === "All" ||
        novel.categories.includes(activeCategory);
      
      const authorName = getAuthorName(novel.authorId).toLowerCase();
      const title = getTranslation(novel, "title").toLowerCase();
      
      const matchesSearch = !query ||
        title.includes(query) ||
        authorName.includes(query);
      
      return matchesCat && matchesSearch;
    });

    // 2. Sort
    if (currentSort === "random") {
      // Simple Fisher-Yates or just Math.random shuffle logic
      filtered.sort(() => Math.random() - 0.5);
    } else if (currentSort === "recently") {
      // Sort by dateAdded DESC, fallback to id DESC
      filtered.sort((a, b) => {
        if (a.dateAdded && b.dateAdded) return new Date(b.dateAdded) - new Date(a.dateAdded);
        return b.id - a.id;
      });
    } else if (currentSort === "popular") {
      filtered.sort((a, b) => b.views - a.views);
    } else if (currentSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (activeCategory !== "All") {
      const catObj = mockDB.categories.find(c => c.id === activeCategory);
      headingEl.textContent = catObj ? (catObj[lang] || catObj.en) : activeCategory;
    } else {
      headingEl.textContent = translations[lang].discover_title || "Discover Novels";
    }

    if (filtered.length === 0) {
      discoverGrid.innerHTML = "";
      noResultsMsg.classList.remove("d-none");
    } else {
      noResultsMsg.classList.add("d-none");
      discoverGrid.innerHTML = filtered.map(novel => {
        const title = getTranslation(novel, "title");
        const authorName = getAuthorName(novel.authorId);

        return `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
          <a href="novel_details.html?id=${novel.id}" class="text-decoration-none">
            <div class="discover-novel-card">
              <div class="discover-card-img-wrap">
                <img src="${novel.imgSrc}" alt="${title}" />
                <div class="discover-card-overlay">
                  <span class="discover-rating">
                    <i class="bi bi-star-fill text-warning"></i> ${novel.rating}
                  </span>
                </div>
              </div>
              <div class="discover-card-body">
                <h6 class="discover-card-title">${title}</h6>
                <p class="discover-card-author">
                  <i class="bi bi-pen"></i> ${authorName}
                </p>
                <div class="discover-card-tags">
                  ${novel.categories.map(catId => {
                      const cat = mockDB.categories.find(c => c.id === catId);
                      return `<span class="discover-tag">${cat ? (cat[lang] || cat.en) : catId}</span>`;
                  }).join("")}
                </div>
              </div>
            </div>
          </a>
        </div>
      `;
      }).join("");
    }
  }

  // Event Listeners
  if (!searchInput.dataset.vListener) {
      searchInput.addEventListener("input", renderGrid);
      searchInput.dataset.vListener = "true";
  }

  document.querySelectorAll(".sort-dropdown .dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = item.getAttribute("data-sort");
      updateSortUI();
      renderGrid();
    });
  });
  
  updateSortUI();
  renderPills();
  renderGrid();
}

document.addEventListener("DOMContentLoaded", renderDiscoverPage);
window.renderDiscoverPage = renderDiscoverPage;
