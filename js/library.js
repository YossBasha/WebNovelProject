const libraryGrid = document.getElementById("libraryGrid");

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
                <img src="${book.img}" alt="${book.title}">
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
