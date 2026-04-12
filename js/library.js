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
function renderLibrary() {
  const libraryGrid = document.getElementById("libraryGrid");
  if (!libraryGrid) return;

  const myBooks = typeof getUserLibrary !== "undefined" ? getUserLibrary() : [];
  const lang = typeof getActiveLang !== "undefined" ? getActiveLang() : "en";
  const viewText = { en: "View", ar: "عرض", es: "Ver" }[lang] || "View";

  if (myBooks.length === 0) {
    libraryGrid.innerHTML = `<div class="col-12 text-center mt-5"><p class="text-white-50">${lang === 'ar' ? 'مكتبتك فارغة حالياً.' : (lang === 'es' ? 'Tu biblioteca está vacía actualmente.' : 'Your library is currently empty.')}</p></div>`;
    return;
  }

  libraryGrid.innerHTML = myBooks
    .map((book) => {
      const title = getTranslation(book, "title");
      const description = getTranslation(book, "description");
      return `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <div class="novel-card">
                <img src="${book.imgSrc}" alt="${title}" class="img-fluid rounded">
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

document.addEventListener("DOMContentLoaded", () => {
  // 1. Force Redirect: If they somehow get to library.html without logging in, kick them out.
  const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  // 2. Render the Library Grid
  renderLibrary();
});

window.renderLibrary = renderLibrary;
