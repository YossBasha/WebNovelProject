const authors = [
  {
    name: "F. Scott Fitzgerald",
    image: "imgs/author1.webp",
    info: "Author of The Great Gatsby.",
  },
  {
    name: "George Orwell",
    image: "imgs/author2.webp",
    info: "Author of 1984.",
  },
  {
    name: "Jane Austen",
    image: "imgs/author3.webp",
    info: "Author of Pride and Prejudice.",
  },
  {
    name: "Osama Abo Se3da",
    image: "imgs/author3.webp",
    info: "3ameed m3rs w 5awal.",
  },
  // Add as many as you want here
];

const authorsGrid = document.getElementById("authorsGrid");

function renderAuthors() {
  authorsGrid.innerHTML = authors
    .map(
      (author) => `
        <div class="col">
            <div class="card bg-dark text-white border-secondary h-100 author-card">
                <img src="${author.image}" class="card-img-top" alt="${author.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${author.name}</h5>
                    <p class="card-text small text-white-50">${author.info}</p>
                    <a href="#" class="btn btn-sm btn-outline-warning">View Works</a>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

renderAuthors();
