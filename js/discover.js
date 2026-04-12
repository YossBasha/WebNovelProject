async function renderDiscoverPage() {
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get("category") || "All";
  let activeStatus = "all";
  const initialQuery = params.get("q") || "";
  let currentSort = "popular";

  const discoverGrid = document.getElementById("discoverGrid");
  const searchInput = document.getElementById("discoverSearch");
  const categoryPillsEl = document.getElementById("categoryPills");
  const statusFiltersEl = document.getElementById("statusFilters");
  const noResultsMsg = document.getElementById("noResultsMsg");
  const headingEl = document.getElementById("discoverHeading");
  const activeSortLabel = document.getElementById("activeSortLabel");

  if (!discoverGrid) return;

  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";

  if (initialQuery && !searchInput.dataset.initialized) {
    searchInput.value = initialQuery;
    searchInput.dataset.initialized = "true";
  }

  // ── Pagination State ─────────────────────────────
  let currentPage = 0;
  const pageSize = 24;
  let allNovels = [];
  let allCategories = [];
  let isLoading = false;
  let hasMore = true;

  // ── Fetch Categories ─────────────────────────────
  try {
    allCategories = await fetchCategories();
  } catch (err) {
    console.error("Discover: Failed to load categories", err);
  }

  // Filter down to famous general categories to avoid 700+ category pills
  const popularCategoryIds = [
    "cat_fiction", "cat_fantasy", "cat_romance", "cat_mystery", 
    "cat_thriller", "cat_science_fiction", "cat_historical_fiction", 
    "cat_young_adult", "cat_classics", "cat_nonfiction", "cat_crime"
  ];
  
  const filteredCategories = allCategories.filter(cat => popularCategoryIds.includes(cat.id));
  const categoriesWithAll = [{ id: "All", en: "All", ar: "الكل", es: "Todo" }, ...filteredCategories];


  async function loadMore(reset = false) {
    if (isLoading || (!hasMore && !reset)) return;
    isLoading = true;

    if (reset) {
      currentPage = 0;
      allNovels = [];
      hasMore = true;
      discoverGrid.innerHTML = "";
    }

    try {
      const query = searchInput ? searchInput.value.trim() : "";
      
      // Fetch pageSize + 1 to peek if there is a next page
      const newNovels = await fetchNovels(pageSize + 1, currentPage * pageSize, query, activeCategory, activeStatus, currentSort);
      
      let novelsToRender = newNovels;
      if (newNovels.length > pageSize) {
        hasMore = true;
        novelsToRender = newNovels.slice(0, pageSize); // Keep only the page size items
      } else {
        hasMore = false;
      }

      // No need for local filtering anymore since the backend handles category/status and search
      const filtered = novelsToRender;

      if (filtered.length === 0 && currentPage === 0) {
        noResultsMsg.classList.remove("d-none");
      } else {
        noResultsMsg.classList.add("d-none");
        allNovels = [...allNovels, ...filtered];
        renderGrid(filtered, !reset);
        currentPage++;
      }

      // Update Load More Button visibility
      const loadMoreBtn = document.getElementById("loadMoreBtn");
      if (loadMoreBtn) {
        if (!hasMore) loadMoreBtn.classList.add("d-none");
        else loadMoreBtn.classList.remove("d-none");
      }

    } catch (err) {
      console.error("Discover: Failed to load books", err);
    } finally {
      isLoading = false;
    }
  }

  function renderPills() {
    if (categoryPillsEl) {
      categoryPillsEl.innerHTML = categoriesWithAll.map(cat => {
        const catName = cat[lang] || cat.en;
        return `<button class="discover-pill ${cat.id === activeCategory ? "active" : ""}" data-category="${cat.id}">${catName}</button>`;
      }).join("");

      categoryPillsEl.querySelectorAll(".discover-pill").forEach(btn => {
        btn.addEventListener("click", () => {
          activeCategory = btn.dataset.category;
          renderPills();
          loadMore(true);
        });
      });
    }
  }

  function initStatusFilters() {
    if (statusFiltersEl) {
      statusFiltersEl.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          statusFiltersEl.querySelectorAll("button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          activeStatus = btn.dataset.status;
          loadMore(true);
        });
      });
    }
  }

  function renderGrid(novelsToAppend = [], append = false) {
    const html = novelsToAppend.map((novel, idx) => {
      const title = novel.title || "";
      const authorName = novel.authorName || "";
      const imgSrc = novel.imgSrc || "imgs/placeholder.webp";

      return `
      <div class="col-6 col-md-4 col-lg-3 col-xl-2 reveal-on-scroll">
        <a href="novel_details.html?id=${novel.id}" class="text-decoration-none">
          <div class="discover-novel-card">
            <div class="discover-card-img-wrap">
              <img src="${imgSrc}" alt="${title}" loading="lazy" onerror="this.src='imgs/placeholder.webp'" />
              <div class="discover-card-overlay">
                <span class="discover-rating">
                  <i class="bi bi-star-fill text-warning"></i> ${novel.rating}
                </span>
              </div>
            </div>
            <div class="discover-card-body">
              <h6 class="discover-card-title text-truncate">${title}</h6>
              <p class="discover-card-author text-truncate"><i class="bi bi-pen"></i> ${authorName}</p>
              <div class="discover-card-tags">
                ${(() => {
                  let tags = novel.categories || [];
                  // Guarantee the active category is visibly displayed
                  if (activeCategory !== 'All' && tags.includes(activeCategory)) {
                    tags = [activeCategory, ...tags.filter(t => t !== activeCategory)];
                  }
                  return tags.slice(0, 2).map(catId => {
                    const cat = allCategories.find(c => c.id === catId);
                    return `<span class="discover-tag">${cat ? (cat[lang] || cat.en) : catId}</span>`;
                  }).join("");
                })()}
              </div>
            </div>
          </div>
        </a>
      </div>`;
    }).join("");

    if (append) {
      discoverGrid.insertAdjacentHTML("beforeend", html);
    } else {
      discoverGrid.innerHTML = html;
    }

    if (window.initScrollReveal) window.initScrollReveal();
  }

  // Load More Button creation (only if it doesn't exist)
  let loadMoreBtn = document.getElementById("loadMoreBtn");
  if (!loadMoreBtn) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "text-center my-5";
    btnContainer.innerHTML = `<button id="loadMoreBtn" class="btn btn-outline-primary px-5 py-2 glass-effect rounded-pill">Load More</button>`;
    discoverGrid.parentElement.appendChild(btnContainer);
    loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.addEventListener("click", () => loadMore());
  }

  // Sort Selection Logic
  document.querySelectorAll(".sort-dropdown .dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Update Active Styling
      document.querySelectorAll(".sort-dropdown .dropdown-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      
      // Update State & Label
      currentSort = item.getAttribute("data-sort") || "popular";
      if (activeSortLabel) {
        const i18n = typeof translations !== "undefined" ? translations[lang] : {};
        const sortKeys = { random: "sort_random", recently: "sort_recently", popular: "sort_popular", rating: "sort_rating" };
        activeSortLabel.textContent = `${i18n["sort_by"] || "Sort By"}: ${i18n[sortKeys[currentSort]] || currentSort}`;
      }
      
      loadMore(true);
    });
  });

  // Search Logic
  let debounceTimeout;
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        loadMore(true);
      }, 500);
    });
  }

  // Initial Load
  initStatusFilters();
  renderPills();
  loadMore(true);
}

document.addEventListener("DOMContentLoaded", renderDiscoverPage);
window.renderDiscoverPage = renderDiscoverPage;
