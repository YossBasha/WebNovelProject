// =============== Mock Database ===================
const mockDB = {
  currentUser: {
    id: 1,
    username: "GuestReader",
    email: "reader@nextpage.com",
    // These IDs correspond to the user's saved books
    savedLibraryIds: [101, 103, 107, 114, 118],
  },

  categories: [
    { name: "Fantasy", image: "imgs/novel1.webp" },
    { name: "Sci-Fi", image: "imgs/novel2.webp" },
    { name: "Romance", image: "imgs/novel3.webp" },
    { name: "Mystery", image: "imgs/novel4.jpg" },
    { name: "Dark Fantasy", image: "imgs/novel5.jpg" },
    { name: "Medieval", image: "imgs/novel6.jpg" },
  ],

  authors: [
    {
      id: 201,
      name: "Arthur Penhaligon",
      image: "imgs/author1.webp",
      bio: "Master of medieval settings and complex character webs.",
    },
    {
      id: 202,
      name: "Peter Brown",
      image: "imgs/author2.webp",
      bio: "Award-winning creator of sci-fi adventures.",
    },
    {
      id: 203,
      name: "Carlo Collodi",
      image: "imgs/author3.webp",
      bio: "Specializes in dark, atmospheric world-building.",
    },
    {
      id: 204,
      name: "Elena Vance",
      image: "imgs/author1.webp",
      bio: "Weaves intricate romances and mysteries.",
    },
    {
      id: 205,
      name: "Marcus Thorne",
      image: "imgs/author2.webp",
      bio: "Explores the bleak, cyberpunk future.",
    },
  ],

  novels: [
    {
      id: 101,
      title: "The Wild Robot",
      authorId: 202,
      price: 14.99,
      categories: ["Sci-Fi"],
      description:
        "A robot finds herself stranded on a remote, wild island, forced to adapt to her surroundings.",
      imgSrc: "imgs/novel1.webp",
      rating: 4.8,
      views: 18900,
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 102,
      title: "Echoes of the Void",
      authorId: 202,
      price: 9.99,
      categories: ["Sci-Fi"],
      description: "A lone astronaut drifts through the darkness between galaxies, hearing transmissions that should be impossible.",
      imgSrc: "imgs/novel2.webp",
      rating: 4.8,
      views: 18900,
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 103,
      title: "The Quartz Heart",
      authorId: 203,
      price: 19.99,
      categories: ["Mystery", "Dark Fantasy"],
      description:
        "In a city of deceit, a puppet must collect enough quartz to uncover the grandest lie of all.",
      imgSrc: "imgs/novel3.webp",
      rating: 4.7,
      views: 15050,
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 104,
      title: "Echoes of Mia",
      authorId: 204,
      price: 4.99,
      categories: ["Romance", "Mystery"],
      description:
        "A gripping story of lost memories, hidden identities, and a love that spans across parallel worlds.",
      imgSrc: "imgs/novel4.jpg",
      rating: 4.2,
      views: 8400,
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 105,
      title: "Neon Skies",
      authorId: 205,
      price: 29.99,
      categories: ["Sci-Fi"],
      description:
        "A rogue hacker discovers a conspiracy that reaches the highest levels of the orbital elite.",
      imgSrc: "imgs/novel5.jpg",
      rating: 4.5,
      views: 12200,
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 106,
      title: "Whispers in the Keep",
      authorId: 201,
      price: 9.99,
      categories: ["Medieval", "Mystery"],
      description:
        "An aging king must solve a string of murders inside his own impenetrable fortress.",
      imgSrc: "imgs/novel6.jpg",
      rating: 4.1,
      views: 5600,
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 107,
      title: "Crimson Veil",
      authorId: 204,
      price: 9.99,
      categories: ["Romance", "Fantasy"],
      description:
        "Two rival mages are forced into an arranged marriage to stop a devastating war.",
      imgSrc: "imgs/novel7.jpg",
      rating: 4.6,
      views: 21000,
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 108,
      title: "Gears of Destiny",
      authorId: 203,
      price: 19.99,
      categories: ["Sci-Fi", "Dark Fantasy"],
      description:
        "A mechanic discovers that the city's clockwork infrastructure is fueled by human souls.",
      imgSrc: "imgs/novel8.jpg",
      rating: 4.3,
      views: 9100,
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 109,
      title: "Blade of the Fallen",
      authorId: 201,
      price: 29.99,
      categories: ["Medieval", "Fantasy"],
      description:
        "A disgraced knight seeks redemption by hunting down the mythical beast that destroyed his order.",
      imgSrc: "imgs/novel9.jpg",
      rating: 4.8,
      views: 28000,
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 110,
      title: "Stellar Drift",
      authorId: 202,
      price: 69.99,
      categories: ["Sci-Fi"],
      description:
        "A cargo crew accidentally smuggles an alien artifact that begins warping their ship's reality.",
      imgSrc: "imgs/novel10.jpg",
      rating: 4.0,
      views: 4300,
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 111,
      title: "The Puppet's Lament",
      authorId: 203,
      price: 19.99,
      categories: ["Dark Fantasy"],
      description:
        "A wooden creation gains sentience, only to realize his creator intends to use him as a weapon.",
      imgSrc: "imgs/novel11.jpg",
      rating: 4.7,
      views: 17500,
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 112,
      title: "Crown of Ash",
      authorId: 201,
      price: 29.99,
      categories: ["Medieval", "Dark Fantasy"],
      description:
        "The heir to a burned kingdom must make a pact with shadow demons to reclaim her throne.",
      imgSrc: "imgs/novel12.jpg",
      rating: 4.4,
      views: 13400,
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 113,
      title: "The Alchemist's Daughter",
      authorId: 204,
      price: 4.99,
      categories: ["Mystery", "Fantasy"],
      description:
        "When the royal alchemist is poisoned, his daughter must decode his final journal to find the cure.",
      imgSrc: "imgs/novel13.jpg",
      rating: 4.5,
      views: 11100,
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 114,
      title: "Cybernetic Hearts",
      authorId: 205,
      price: 19.99,
      categories: ["Sci-Fi", "Romance"],
      description:
        "In a city where emotions can be bought and sold, an android falls in love with a human detective.",
      imgSrc: "imgs/novel14.jpg",
      rating: 4.2,
      views: 8900,
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 115,
      title: "Ruins of the Old World",
      authorId: 202,
      price: 4.99,
      categories: ["Sci-Fi", "Mystery"],
      description:
        "Explorers dive into the submerged ruins of Old Earth, awakening something that was meant to stay asleep.",
      imgSrc: "imgs/novel15.jpg",
      rating: 4.6,
      views: 19200,
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 116,
      title: "The Clockwork Prince",
      authorId: 203,
      price: 2.99,
      categories: ["Fantasy", "Romance"],
      description:
        "A street thief accidentally awakens a mechanical prince who has been asleep for three centuries.",
      imgSrc: "imgs/novel16.jpg",
      rating: 4.3,
      views: 10500,
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 117,
      title: "Phantom of the Grid",
      authorId: 205,
      price: 4.99,
      categories: ["Sci-Fi", "Mystery"],
      description:
        "A legendary hacker thought to be dead begins leaving clues inside the city's mainframe.",
      imgSrc: "imgs/novel17.jpg",
      rating: 4.8,
      views: 22000,
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 118,
      title: "Tears of the Leviathan",
      authorId: 201,
      price: 29.99,
      categories: ["Medieval", "Fantasy"],
      description:
        "Pirates and knights form an uneasy alliance to hunt down a sea monster terrorizing the coastal kingdoms.",
      imgSrc: "imgs/novel18.jpg",
      rating: 4.1,
      views: 7800,
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 119,
      title: "The Last Automaton",
      authorId: 203,
      price: 59.99,
      categories: ["Sci-Fi", "Dark Fantasy"],
      description:
        "The last functioning machine in a dead world tries to fulfill its final directive: plant a single tree.",
      imgSrc: "imgs/novel19.jpg",
      rating: 4.9,
      views: 31000,
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 120,
      title: "Shattered Vows",
      authorId: 204,
      price: 19.99,
      categories: ["Romance", "Medieval"],
      description:
        "A queen must decide between her duty to her kingdom and her secret love for the captain of her guard.",
      imgSrc: "imgs/novel20.jpg",
      rating: 4.4,
      views: 14500,
      isFeatured: false,
      isBestSeller: true,
    },
  ],
};
// =============== Helper Functions (Simulating Backend Queries) ===================

// Get all featured novels for your main slider
function getFeaturedNovels() {
  return mockDB.novels.filter((novel) => novel.isFeatured);
}

// Get top bestsellers
function getBestSellers() {
  // Sorts by views descending and grabs the top 10
  return mockDB.novels
    .filter((novel) => novel.isBestSeller)
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
}

// Get the specific books in the current user's library
function getUserLibrary() {
  return mockDB.novels.filter((novel) =>
    mockDB.currentUser.savedLibraryIds.includes(novel.id),
  );
}

// Get an author's name by their ID (useful for rendering the novel cards)
function getAuthorName(authorId) {
  const author = mockDB.authors.find((a) => a.id === authorId);
  return author ? author.name : "Unknown Author";
}
// =============== HTML template for a single novel card ===================
function createNovelCard(novel) {
  const authorName = getAuthorName(novel.authorId);

  return `
  <a href="novel_details.html?id=${novel.id}" class="text-decoration-none text-dark novel-link-wrapper">
    <div class="card h-100 shadow-sm border-secondary">
      <img src="${novel.imgSrc}" class="card-img-top" alt="${novel.title}" style="height: 280px; object-fit: cover;" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold mb-1">${novel.title}</h5>
        <p class="text-muted small mb-2"><i class="bi bi-pen"></i> ${authorName}</p>
        
        <p class="card-text small mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
          ${novel.description}
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
document.addEventListener("DOMContentLoaded", () => {
  const novelSlider = document.getElementById("novelSlider");
  const bestSellerSlider = document.getElementById("bestSellerSlider");
  const categoryContainer = document.getElementById("categoryContainer");

  // 1. Render Featured Novels Slider
  if (novelSlider) {
    const featuredNovels = mockDB.novels.filter(
      (novel) => novel.isFeatured === true,
    );
    novelSlider.innerHTML = featuredNovels
      .map((novel) => createNovelCard(novel))
      .join("");
  }

  // 2. Render Best Sellers Slider (Sorted by highest views)
  if (bestSellerSlider) {
    const bestSellers = mockDB.novels
      .filter((novel) => novel.isBestSeller === true)
      .sort((a, b) => b.views - a.views); // Sort highest to lowest

    bestSellerSlider.innerHTML = bestSellers
      .map((novel) => createNovelCard(novel))
      .join("");
  }

  // 3. Render Categories Grid
  if (categoryContainer) {
    categoryContainer.innerHTML = mockDB.categories
      .map(
        (category) => `
      <div class="col-6 col-md-4 col-lg-2 mb-3">
        <a href="discover.html?category=${encodeURIComponent(category.name)}" class="text-decoration-none">
          <div class="card category-card border-0 shadow-sm overflow-hidden" style="height: 140px; cursor: pointer; transition: transform 0.2s; border-radius: 0.75rem; background-color: #1a1a1a;">
            
            <img src="${category.image}" class="card-img" style="height: 100%; width: 100%; object-fit: cover; border-radius: 0.75rem;" alt="${category.name}" />
            
            <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center" style="background: rgba(0, 0, 0, 0.5); border-radius: 0.75rem;">
              <h5 class="card-title fw-bold text-white m-0 text-center text-uppercase" style="letter-spacing: 1px; font-size: 0.95rem;">
                ${category.name}
              </h5>
            </div>
            
          </div>
        </a>
      </div>
    `,
      )
      .join("");
  }
});
