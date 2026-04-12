// =============== API Data Layer ===================
// All data is now fetched from the backend API.
// mockDB has been removed.

// In-memory cache so we only fetch once per page load
window.__cache = window.__cache || {};

async function safeFetch(url, options = {}, retries = 3) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      console.warn(`Fetch failed, retrying... (${retries} left): ${url}`);
      return await safeFetch(url, options, retries - 1);
    }
    console.error("Critical Fetch Error:", err);
    throw err;
  }
}

async function fetchNovels(limit = 20, offset = 0, query = '', category = 'All', status = 'all', sort = 'popular') {
  let url = `${API_BASE_URL}/api/novels?limit=${limit}&offset=${offset}`;
  if (query) url += `&q=${encodeURIComponent(query)}`;
  if (category && category !== 'All') url += `&category=${encodeURIComponent(category)}`;
  if (status && status !== 'all') url += `&status=${encodeURIComponent(status)}`;
  if (sort && sort !== 'popular') url += `&sort=${encodeURIComponent(sort)}`;
  
  return await safeFetch(url);
}

async function fetchFeatured() {
  return await safeFetch(`${API_BASE_URL}/api/novels/featured`);
}

async function fetchBestsellers() {
  return await safeFetch(`${API_BASE_URL}/api/novels/bestsellers`);
}

async function fetchAuthors(limit = 24, offset = 0, query = '') {
  let url = `${API_BASE_URL}/api/authors?limit=${limit}&offset=${offset}`;
  if (query) url += `&q=${encodeURIComponent(query)}`;
  return await safeFetch(url);
}

async function fetchCategories() {
  if (window.__cache.categories) return window.__cache.categories;
  const data = await safeFetch(`${API_BASE_URL}/api/categories`);
  window.__cache.categories = data;
  return data;
}

// =============== Helper Functions ===================

function getActiveLang() {
  return localStorage.getItem("preferredLang") || "en";
}

function getTranslation(obj, field) {
  // For novels/authors fetched from API, all text is in English (field = 'title' or 'description')
  // We map field names to the flat properties returned by the API
  const lang = getActiveLang();
  // API returns flat: { title, description, name, bio }
  if (obj[field] !== undefined) return obj[field];
  // Fallback for old-style objects
  if (obj[lang] && obj[lang][field]) return obj[lang][field];
  if (obj.en && obj.en[field]) return obj.en[field];
  return "";
}

window.getActiveLang = getActiveLang;
window.getTranslation = getTranslation;

// =============== Novel Card HTML ===================

function createNovelCard(novel, categories = []) {
  const title = novel.title || novel.en?.title || "";
  const authorName = novel.authorName || "Unknown Author";
  const description = novel.description || novel.en?.description || "";
  const imgSrc = novel.imgSrc
    ? (novel.imgSrc.startsWith("http") ? novel.imgSrc : `${API_BASE_URL}/${novel.imgSrc}`)
    : "";

  return `
  <a href="novel_details.html?id=${novel.id}" class="text-decoration-none text-dark novel-link-wrapper">
    <div class="card h-100 shadow-sm border-secondary">
      <img src="${imgSrc}" class="card-img-top" alt="${title}" loading="lazy" style="height: 280px; object-fit: cover;" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold mb-1">${title}</h5>
        <p class="text-muted small mb-2"><i class="bi bi-pen"></i> ${authorName}</p>
        <p class="card-text small mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
          ${description}
        </p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <span class="text-warning fw-bold small"><i class="bi bi-star-fill"></i> ${novel.rating}</span>
          <span class="text-secondary small"><i class="bi bi-eye"></i> ${(novel.views || 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  </a>
  `;
}

window.createNovelCard = createNovelCard;

// =============== Render Home Page ===================

async function renderAllData() {
  const lang = getActiveLang();

  try {
    // Only load these specifically for the home page to avoid pulling 16k novels
    const novelSlider = document.getElementById("novelSlider");
    const bestSellerSlider = document.getElementById("bestSellerSlider");
    const categoryContainer = document.getElementById("categoryContainer");

    // Fetch in parallel what is needed
    const promises = [fetchCategories()];
    if (novelSlider) promises.push(fetchFeatured());
    if (bestSellerSlider) promises.push(fetchBestsellers());
    
    // We only need some novels for category covers, fetch a randomly shuffled batch to ensure diverse covers
    if (categoryContainer) promises.push(fetchNovels(100, 0, "", "All", "all", "random")); 

    const results = await Promise.all(promises);
    const categories = results[0] || [];
    let idx = 1;
    const featured = novelSlider ? results[idx++] : [];
    const bestSellers = bestSellerSlider ? results[idx++] : [];
    const randomNovels = categoryContainer ? results[idx++] : [];

    if (novelSlider) {
      novelSlider.innerHTML = featured.length > 0 
        ? featured.map(n => createNovelCard(n, categories)).join("") 
        : "<p class='text-white-50'>No featured novels available.</p>";
    }

    if (bestSellerSlider) {
      bestSellerSlider.innerHTML = bestSellers.length > 0
        ? bestSellers.map(n => createNovelCard(n, categories)).join("")
        : "<p class='text-white-50'>No bestsellers available.</p>";
    }

    if (categoryContainer) {
      // Filter down to famous general categories for the homepage
      const popularCategoryIds = [
        "cat_fiction", "cat_fantasy", "cat_romance", "cat_mystery", 
        "cat_thriller", "cat_science_fiction", "cat_historical_fiction", 
        "cat_young_adult", "cat_classics", "cat_nonfiction", "cat_crime"
      ];
      const displayCategories = categories.filter(cat => popularCategoryIds.includes(cat.id)).slice(0, 12);
      
      categoryContainer.innerHTML = displayCategories.map(cat => {
        const catName = cat[lang] || cat.en;
        
        // Find a novel belonging to this category to use as cover
        const catNovels = randomNovels.filter(n => (n.categories || []).includes(cat.id));
        let coverImage = `${API_BASE_URL}/${cat.image}`;
        
        if (catNovels.length > 0) {
            const randomNovel = catNovels[Math.floor(Math.random() * catNovels.length)];
            coverImage = randomNovel.imgSrc.startsWith("http") 
              ? randomNovel.imgSrc 
              : `${API_BASE_URL}/${randomNovel.imgSrc}`;
        } else if (cat.image && cat.image.startsWith("http")) {
            coverImage = cat.image; // fallback to categorical image if valid URL
        }

        return `
        <div class="col-6 col-md-4 col-lg-2 mb-3">
          <a href="discover.html?category=${encodeURIComponent(cat.id)}" class="text-decoration-none">
            <div class="card category-card border-0 shadow-sm overflow-hidden" style="height: 140px; cursor: pointer; transition: transform 0.2s; border-radius: 0.75rem; background-color: #1a1a1a;">
              <img src="${coverImage}" onerror="this.src='./imgs/placeholder.webp'" class="card-img" style="height: 100%; width: 100%; object-fit: cover; border-radius: 0.75rem;" alt="${catName}" />
              <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center" style="background: rgba(0, 0, 0, 0.5); border-radius: 0.75rem;">
                <h5 class="card-title fw-bold text-white m-0 text-center text-uppercase" style="letter-spacing: 1px; font-size: 0.95rem;">
                  ${catName}
                </h5>
              </div>
            </div>
          </a>
        </div>`;
      }).join("");
    }

  } catch (err) {
    console.error("Failed to load data from API:", err);
  }
}

// Expose globals needed by other scripts
window.fetchNovels = fetchNovels;
window.fetchAuthors = fetchAuthors;
window.fetchCategories = fetchCategories;
window.renderAllData = renderAllData;

document.addEventListener("DOMContentLoaded", renderAllData);
