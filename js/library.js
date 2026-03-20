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
document.addEventListener("DOMContentLoaded", () => {
  // 1. Force Redirect: If they somehow get to library.html without logging in, kick them out.
  const token =
    localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  if (!token) {
    window.location.href = "index.html";
    return; // Stop the script here so it doesn't try to load the books
  }

  // 2. Render the Library Grid
  const libraryGrid = document.getElementById("libraryGrid");

  if (libraryGrid) {
    const myBooks = [
      {
        id: 1,
        title: "The Wild Robot",
        rating: "4.8",
        img: "./imgs/novel1.webp",
        details: "A robot finds herself on a remote island.",
      },
    ];

    function renderLibrary() {
      libraryGrid.innerHTML = myBooks
        .map(
          (book) => `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
            <div class="novel-card">
                <img src="${book.img}" alt="${book.title}" class="img-fluid rounded">
                <div class="hover-overlay text-center">
                    <h6 class="text-white fw-bold">${book.title}</h6>
                    <p class="text-warning small mb-2"><i class="bi bi-star-fill"></i> ${book.rating}</p>
                    <p class="text-light" style="font-size: 0.7rem;">${book.details}</p>
                    <a href="view.html?id=${book.id}" class="btn btn-sm btn-primary w-100 mt-2">View</a>
                </div>
            </div>
        </div>
      `,
        )
        .join("");
    }

    renderLibrary();
  }
});
