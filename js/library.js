checkAuthState();
// --- Protect Personal Library Link ---
const personalLibraryLink = document.getElementById("personalLibraryLink");

if (personalLibraryLink) {
  personalLibraryLink.addEventListener("click", (e) => {
    // Check if user is logged in
    const token =
      localStorage.getItem("userToken") || sessionStorage.getItem("userToken");

    if (!token) {
      // Stop the link from taking them to library.html
      e.preventDefault();

      // Find the login modal and show it
      const loginModalEl = document.getElementById("loginModal");
      // Get existing Bootstrap modal instance, or create a new one if it doesn't exist yet
      const loginModal =
        bootstrap.Modal.getInstance(loginModalEl) ||
        new bootstrap.Modal(loginModalEl);

      loginModal.show();
    }
    // If they DO have a token, the code does nothing and lets the link work normally!
  });
}
let currentSort = "recently";

async function renderLibrary() {
  const libraryGrid = document.getElementById("libraryGrid");
  if (!libraryGrid) return;

  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : (localStorage.getItem("preferredLang") || "en");
  const viewText = { en: "View", ar: "عرض", es: "Ver" }[lang] || "View";

  let allNovels = [];
  try {
    allNovels = await fetchNovels();
  } catch (err) {
    console.error("Library: Failed to fetch novels", err);
    libraryGrid.innerHTML = `<p class="text-danger text-center w-100">Failed to load library.</p>`;
    return;
  }

  // --- Mock User Library Logic ---
  // In a real app, this would come from a 'UserLibrary' API endpoint.
  // For now, we'll mock it by picking a few specific novel IDs.
  const myBookIds = [101, 103, 105, 107, 109];
  let myBooks = allNovels.filter(n => myBookIds.includes(n.id));

  if (myBooks.length === 0) {
    libraryGrid.innerHTML = `<div class="col-12 text-center mt-5"><p class="text-white-50">${
      lang === "ar"
        ? "مكتبتك فارغة حالياً."
        : lang === "es"
          ? "Tu biblioteca está vacía actualmente."
          : "Your library is currently empty."
    }</p></div>`;
    return;
  }

  // --- Sorting Logic ---
  if (currentSort === "rating") {
    myBooks.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === "az") {
    myBooks.sort((a, b) => {
      const titleA = (typeof getTranslation !== "undefined" ? getTranslation(a, "title") : a.title).toLowerCase();
      const titleB = (typeof getTranslation !== "undefined" ? getTranslation(b, "title") : b.title).toLowerCase();
      return titleA.localeCompare(titleB, lang);
    });
  }
  // "recently" uses the default order

  libraryGrid.innerHTML = myBooks
    .map((book) => {
      const title = book.title;
      const description = book.description;
      const imgSrc = book.imgSrc
        ? (book.imgSrc.startsWith("http") ? book.imgSrc : `${API_BASE_URL}/${book.imgSrc}`)
        : "";

      return `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <div class="novel-card">
                <img src="${imgSrc}" alt="${title}" class="img-fluid rounded">
                <div class="hover-overlay text-center">
                    <h6 class="text-white fw-bold">${title}</h6>
                    <p class="text-warning small mb-2"><i class="bi bi-star-fill"></i> ${book.rating}</p>
                    <p class="text-light" style="font-size: 0.7rem;">${description}</p>
                    <a href="novel_details.html?id=${book.id}" class="btn btn-sm btn-primary w-100 mt-2">${viewText}</a>
                </div>
            </div>
        </div>
      `;
    })
    .join("");
}


function initSorting() {
  const sortOptions = document.querySelectorAll(".sort-option");
  const sortButton = document.getElementById("librarySortButton");

  sortOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = option.getAttribute("data-sort");

      // Update button text to reflect current sort (localized)
      if (sortButton) {
        const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : (localStorage.getItem("preferredLang") || "en");
        const sortKey = option.getAttribute("data-i18n");
        if (typeof translations !== "undefined" && translations[lang] && translations[lang][sortKey]) {
          sortButton.textContent = translations[lang][sortKey];
        } else {
          sortButton.textContent = option.textContent;
        }
      }

      renderLibrary();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Force Redirect: If they somehow get to library.html without logging in, kick them out.
  const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  // 2. Render the Library Grid
  renderLibrary();

  // 3. Initialize Sorting
  initSorting();
});

window.renderLibrary = renderLibrary;
