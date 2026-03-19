// =============== Data fetched from our future Database ===================
const novelData = {
  title: "Novel Name",
  description: "Description",
  imgSrc: "imgs/novel1.webp",
};

const categories = ["Fantasy", "Sci-Fi", "Romance", "Mystery"];

// =============== HTML template for a single novel card ===================
function createNovelCard(novel) {
  return `
  <a href="novel_details.html?title=${encodeURIComponent(novel.title)} " class="text-decoration-none text-dark">
    <div class="card">
      <img src="${novel.imgSrc}" class="card-img-top" alt="${novel.title}" />
      <div class="card-body">
        <h5 class="card-title">${novel.title}</h5>
        <p class="card-text">${novel.description}</p>
      </div>
    </div>
  </a>
  `;
}

let novelsHTML = "";
for (let i = 0; i < 10; i++) {
  novelsHTML += createNovelCard(novelData);
}

let categoriesHTML = categories
  .map(
    (category) => `
  <div class="col-6 col-lg-3">
    <div class="card category-card border-0">
      <img src="imgs/novel1.webp" class="card-img" alt="${category}" />
      <div class="card-img-overlay d-flex flex-column justify-content-end">
        <h5 class="card-title fw-bold m-0">${category}</h5>
      </div>
    </div>
  </div>
`,
  )
  .join("");

// Injecting the HTML into the DOM when the page loads
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("novelSlider").innerHTML = novelsHTML;
  document.getElementById("bestSellerSlider").innerHTML = novelsHTML;
  document.getElementById("categoryContainer").innerHTML = categoriesHTML;
});
