// =============== Mock Database (Multi-language Support) ===================
const mockDB = {
  currentUser: {
    id: 1,
    username: "GuestReader",
    email: "reader@nextpage.com",
    savedLibraryIds: [101, 103, 107, 114, 118],
    preferences: {
      moreRomance: false,
      moreFantasy: true,
      language: "en"
    }
  },

  categories: [
    { id: "cat1", en: "Fantasy", ar: "خيال", es: "Fantasía", image: "imgs/novel1.webp" },
    { id: "cat2", en: "Sci-Fi", ar: "خيال علمي", es: "Ciencia Ficción", image: "imgs/novel2.webp" },
    { id: "cat3", en: "Romance", ar: "رومانسي", es: "Romance", image: "imgs/novel3.webp" },
    { id: "cat4", en: "Mystery", ar: "غموض", es: "Misterio", image: "imgs/novel4.jpg" },
    { id: "cat5", en: "Dark Fantasy", ar: "فانتازيا مظلمة", es: "Fantasía Oscura", image: "imgs/novel5.jpg" },
    { id: "cat6", en: "Medieval", ar: "عصور وسطى", es: "Medieval", image: "imgs/novel6.jpg" },
  ],

  authors: [
    {
      id: 201,
      en: { name: "Arthur Penhaligon", bio: "Master of medieval settings and complex character webs." },
      image: "imgs/author1.jpg",
    },
    {
      id: 202,
      en: { name: "Peter Brown", bio: "Award-winning creator of sci-fi adventures." },
      image: "imgs/author2.jpg",
    },
    {
      id: 203,
      en: { name: "Carlo Collodi", bio: "Specializes in dark, atmospheric world-building." },
      image: "imgs/author3.jpg",
    },
    {
      id: 204,
      en: { name: "Elena Vance", bio: "Weaves intricate romances and mysteries." },
      image: "imgs/author4.jpg",
    },
    {
      id: 205,
      en: { name: "Marcus Thorne", bio: "Explores the bleak, cyberpunk future." },
      image: "imgs/author5.jpg",
    },
  ],

  novels: [
    {
      id: 101,
      en: { title: "The Wild Robot", description: "A robot finds herself stranded on a remote, wild island, forced to adapt." },
      authorId: 202,
      price: 14.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel1.webp",
      rating: 4.8,
      views: 18900,
      dateAdded: "2024-03-01",
      chapters: [
        { id: 1, en: "The Awakening" },
        { id: 2, en: "Wild Waters" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 102,
      en: { title: "Echoes of the Void", description: "A lone astronaut drifts through the darkness between galaxies, hearing transmissions." },
      authorId: 202,
      price: 9.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel2.webp",
      rating: 4.8,
      views: 18900,
      dateAdded: "2024-03-05",
      chapters: [
        { id: 1, en: "Stardust" },
        { id: 2, en: "The Silent Signal" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 103,
      en: { title: "The Quartz Heart", description: "In a city of deceit, a puppet must collect enough quartz to uncover the truth." },
      authorId: 203,
      price: 19.99,
      categories: ["cat4", "cat5"],
      imgSrc: "imgs/novel3.webp",
      rating: 4.7,
      views: 15050,
      dateAdded: "2024-02-10",
      chapters: [
        { id: 1, en: "Gears and Glass" },
        { id: 2, en: "The Merchant's Lie" }
      ],
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 104,
      en: { title: "Echoes of Mia", description: "A gripping story of lost memories, hidden identities, and a love that spans worlds." },
      authorId: 204,
      price: 4.99,
      categories: ["cat3", "cat4"],
      imgSrc: "imgs/novel4.jpg",
      rating: 4.2,
      views: 8400,
      dateAdded: "2024-03-10",
      chapters: [
        { id: 1, en: "Fragmented Memory" },
        { id: 2, en: "Across the Veil" }
      ],
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 105,
      en: { title: "Neon Skies", description: "A rogue hacker discovers a conspiracy that reaches the highest levels." },
      authorId: 205,
      price: 29.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel5.jpg",
      rating: 4.5,
      views: 12200,
      dateAdded: "2024-01-20",
      chapters: [
        { id: 1, en: "Grid Access" },
        { id: 2, en: "Zero Day" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 106,
      en: { title: "Whispers in the Keep", description: "An aging king must solve a string of murders inside his own fortress." },
      authorId: 201,
      price: 9.99,
      categories: ["cat6", "cat4"],
      imgSrc: "imgs/novel6.jpg",
      rating: 4.1,
      views: 5600,
      dateAdded: "2024-03-20",
      chapters: [
        { id: 1, en: "The Cold Throne" },
        { id: 2, en: "Blood in the Halls" }
      ],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 107,
      en: { title: "Crimson Veil", description: "Two rival mages are forced into an arranged marriage to stop a war." },
      authorId: 204,
      price: 9.99,
      categories: ["cat3", "cat1"],
      imgSrc: "imgs/novel7.jpg",
      rating: 4.6,
      views: 21000,
      dateAdded: "2024-02-28",
      chapters: [
        { id: 1, en: "The Eternal Pact" },
        { id: 2, en: "Forbidden Sparks" }
      ],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 108,
      en: { title: "Gears of Destiny", description: "A mechanic discovers that the city's infrastructure is fueled by souls." },
      authorId: 203,
      price: 19.99,
      categories: ["cat2", "cat5"],
      imgSrc: "imgs/novel8.jpg",
      rating: 4.3,
      views: 9100,
      dateAdded: "2024-03-22",
      chapters: [
        { id: 1, en: "Fuel of Souls" }
      ],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 109,
      en: { title: "Blade of the Fallen", description: "A disgraced knight seeks redemption by hunting down a mythical beast." },
      authorId: 201,
      price: 29.99,
      categories: ["cat6", "cat1"],
      imgSrc: "imgs/novel9.jpg",
      rating: 4.8,
      views: 28000,
      dateAdded: "2024-01-15",
      chapters: [
        { id: 1, en: "The Broken Vow" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 119,
      en: { title: "The Last Automaton", description: "The last machine in a dead world plants a single tree." },
      authorId: 203,
      price: 59.99,
      categories: ["cat2", "cat5"],
      imgSrc: "imgs/novel19.jpg",
      rating: 4.9,
      views: 31000,
      dateAdded: "2024-04-01",
      chapters: [
        { id: 1, en: "A Singularity" }
      ],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 110,
      en: { title: "Sands of Time", description: "An archaeologist uncovers a portal to an ancient civilization." },
      authorId: 201,
      price: 12.50,
      categories: ["cat6", "cat4"],
      imgSrc: "imgs/novel10.jpg",
      rating: 4.4,
      views: 7200,
      dateAdded: "2024-03-25",
      chapters: [{ id: 1, en: "The First Dig" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 111,
      en: { title: "Shadow Waltz", description: "A spy must dance through a ball of enemies to retrieve a secret." },
      authorId: 204,
      price: 15.00,
      categories: ["cat3", "cat4"],
      imgSrc: "imgs/novel11.jpg",
      rating: 4.6,
      views: 11500,
      dateAdded: "2024-03-28",
      chapters: [{ id: 1, en: "Masquerade" }],
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 112,
      en: { title: "Orbital Drift", description: "Space station survivors deal with a strange entity." },
      authorId: 202,
      price: 19.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel12.jpg",
      rating: 4.3,
      views: 9800,
      dateAdded: "2024-02-15",
      chapters: [{ id: 1, en: "Oxygen Low" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 113,
      en: { title: "The Alchemist's Debt", description: "A young alchemist must pay off a debt to a literal demon." },
      authorId: 203,
      price: 24.99,
      categories: ["cat1", "cat5"],
      imgSrc: "imgs/novel13.jpg",
      rating: 4.7,
      views: 14200,
      dateAdded: "2024-01-10",
      chapters: [{ id: 1, en: "Transmutation" }],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 114,
      en: { title: "Midnight Protocol", description: "Digital ghosts haunt the city's megastructures." },
      authorId: 205,
      price: 0.00,
      categories: ["cat2", "cat4"],
      imgSrc: "imgs/novel14.jpg",
      rating: 4.5,
      views: 22000,
      dateAdded: "2024-03-30",
      chapters: [{ id: 1, en: "Login Error" }],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 115,
      en: { title: "The Iron King", description: "A story of a kingdom ruled by a monarch who is literally made of iron." },
      authorId: 201,
      price: 34.99,
      categories: ["cat6", "cat1"],
      imgSrc: "imgs/novel15.jpg",
      rating: 4.8,
      views: 17500,
      dateAdded: "2024-02-20",
      chapters: [{ id: 1, en: "Forged in Fire" }],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 116,
      en: { title: "Starlit Promises", description: "A romance set on a colony planet under three suns." },
      authorId: 204,
      price: 11.99,
      categories: ["cat3", "cat2"],
      imgSrc: "imgs/novel16.jpg",
      rating: 4.4,
      views: 6300,
      dateAdded: "2024-03-05",
      chapters: [{ id: 1, en: "Under Three Suns" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 117,
      en: { title: "Void Walker", description: "Searching for the end of the universe at the edge of the void." },
      authorId: 202,
      price: 21.00,
      categories: ["cat2", "cat5"],
      imgSrc: "imgs/novel17.jpg",
      rating: 4.9,
      views: 29000,
      dateAdded: "2024-04-05",
      chapters: [{ id: 1, en: "The Edge" }],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 118,
      en: { title: "Curse of the Raven", description: "A detective must solve a murder committed by a ghost." },
      authorId: 204,
      price: 9.99,
      categories: ["cat4", "cat5"],
      imgSrc: "imgs/novel18.jpg",
      rating: 4.2,
      views: 5400,
      dateAdded: "2024-03-12",
      chapters: [{ id: 1, en: "The Raven's Cry" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 120,
      en: { title: "Chronos Protocol", description: "Time travelers accidentally delete the 21st century." },
      authorId: 205,
      price: 49.99,
      categories: ["cat2", "cat4"],
      imgSrc: "imgs/novel20.jpg",
      rating: 4.7,
      views: 18000,
      dateAdded: "2024-04-10",
      chapters: [{ id: 1, en: "Temporal Rift" }],
      isFeatured: true,
      isBestSeller: true,
    }
  ],
};

// =============== Helper Functions (Simulating Backend Queries) ===================

function getActiveLang() {
  return localStorage.getItem("preferredLang") || "en";
}

function getTranslation(obj, field) {
  const lang = getActiveLang();
  return obj[lang] ? obj[lang][field] : (obj.en ? obj.en[field] : "");
}

function getFeaturedNovels() {
  return mockDB.novels.filter((novel) => novel.isFeatured);
}

function getBestSellers() {
  return mockDB.novels
    .filter((novel) => novel.isBestSeller)
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
}

function getUserLibrary() {
  return mockDB.novels.filter((novel) =>
    mockDB.currentUser.savedLibraryIds.includes(novel.id),
  );
}

window.getActiveLang = getActiveLang;
window.getTranslation = getTranslation;
window.getUserLibrary = getUserLibrary;

function getAuthorName(authorId) {
  const author = mockDB.authors.find((a) => a.id === authorId);
  return author ? getTranslation(author, "name") : "Unknown Author";
}

function createNovelCard(novel) {
  const authorName = getAuthorName(novel.authorId);
  const title = getTranslation(novel, "title");
  const description = getTranslation(novel, "description");

  return `
  <a href="novel_details.html?id=${novel.id}" class="text-decoration-none text-dark novel-link-wrapper">
    <div class="card h-100 shadow-sm border-secondary">
      <img src="${novel.imgSrc}" class="card-img-top" alt="${title}" style="height: 280px; object-fit: cover;" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold mb-1">${title}</h5>
        <p class="text-muted small mb-2"><i class="bi bi-pen"></i> ${authorName}</p>
        
        <p class="card-text small mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
          ${description}
        </p>
        
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <span class="text-warning fw-bold small"><i class="bi bi-star-fill"></i> ${novel.rating}</span>
          <span class="text-secondary small"><i class="bi bi-eye"></i> ${novel.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  </a>
  `;
}

// =============== Injecting the HTML into the DOM ===================
function renderAllData() {
  const lang = getActiveLang();
  const novelSlider = document.getElementById("novelSlider");
  const bestSellerSlider = document.getElementById("bestSellerSlider");
  const categoryContainer = document.getElementById("categoryContainer");

  if (novelSlider) {
    const featuredNovels = getFeaturedNovels();
    novelSlider.innerHTML = featuredNovels.map((n) => createNovelCard(n)).join("");
  }

  if (bestSellerSlider) {
    const bestSellers = getBestSellers();
    bestSellerSlider.innerHTML = bestSellers.map((n) => createNovelCard(n)).join("");
  }

  if (categoryContainer) {
    categoryContainer.innerHTML = mockDB.categories
      .map((cat) => {
        const catName = cat[lang] || cat.en;

        // Find all novels that belong to this category
        const categoryNovels = mockDB.novels.filter((novel) =>
          novel.categories.includes(cat.id)
        );

        // Pick a random novel cover or use the default category image
        let coverImage = cat.image;
        if (categoryNovels.length > 0) {
          const randomIndex = Math.floor(Math.random() * categoryNovels.length);
          coverImage = categoryNovels[randomIndex].imgSrc;
        }

        return `
        <div class="col-6 col-md-4 col-lg-2 mb-3">
          <a href="discover.html?category=${encodeURIComponent(cat.id)}" class="text-decoration-none">
            <div class="card category-card border-0 shadow-sm overflow-hidden" style="height: 140px; cursor: pointer; transition: transform 0.2s; border-radius: 0.75rem; background-color: #1a1a1a;">
              <img src="${coverImage}" class="card-img" style="height: 100%; width: 100%; object-fit: cover; border-radius: 0.75rem;" alt="${catName}" />
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
}

document.addEventListener("DOMContentLoaded", renderAllData);
window.renderAllData = renderAllData; // Expose to i18n switcher
