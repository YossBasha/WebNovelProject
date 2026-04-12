document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const novelId = parseInt(params.get("id"));

  if (!novelId || typeof mockDB === "undefined") return;

  const novel = mockDB.novels.find((n) => n.id === novelId);

  if (novel) {
    const author = mockDB.authors.find((a) => a.id === novel.authorId);
    const authorName = author ? author.name : "Unknown Author";

    document.title = `${novel.title} - NextPage`;

    const imgEl = document.querySelector(".image-section img");
    if (imgEl) imgEl.src = novel.imgSrc;

    const titleEl = document.querySelector(".novel-title");
    if (titleEl) titleEl.textContent = novel.title;

    const authorEl = document.getElementById("authorLink");
    if (authorEl) {
      authorEl.textContent = `by ${authorName}`;
      if (author) {
        authorEl.href = `author_details.html?id=${author.id}`;
      }
    }

    const chipsEl = document.getElementById("categoryChips");
    if (chipsEl) {
      chipsEl.innerHTML = novel.categories
        .map((c) => `<a href="discover.html?category=${encodeURIComponent(c)}" class="category-chip">${c}</a>`)
        .join("");
    }

    const descEl = document.querySelector(".description");
    if (descEl) descEl.textContent = novel.description;

    const ratingEl = document.querySelector(".rating-value");
    if (ratingEl) ratingEl.textContent = novel.rating;

    const priceEl = document.querySelector(".novel-price");
    if (priceEl) {
      priceEl.textContent = novel.price ? `$${novel.price.toFixed(2)}` : "Free";
    }
  } else {
    const titleEl = document.querySelector(".novel-title");
    if (titleEl) titleEl.innerText = "Novel Not Found";
    const descEl = document.querySelector(".description");
    if (descEl) descEl.innerText = "This book does not exist in our database.";
  }

  const buyBtn = document.querySelector(".buy-btn");
  if (buyBtn) {
    const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    if (!token) {
      buyBtn.innerText = "Login to Buy";
      buyBtn.setAttribute("data-bs-toggle", "modal");
      buyBtn.setAttribute("data-bs-target", "#loginModal");
    }
  }
});
