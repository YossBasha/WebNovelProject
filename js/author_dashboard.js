document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const authorId = localStorage.getItem("authorId") || sessionStorage.getItem("authorId");

  if (!token || (userRole !== "Author" && userRole !== "Admin")) {
    alert("Access Denied. Author privileges required.");
    window.location.href = "index.html";
    return;
  }

  if (!authorId || authorId === "null") {
    document.getElementById("authorNovelsContainer").innerHTML = `
      <div class="col-12 text-center text-white-50 mt-5">
        <h4>No Author Profile Linked</h4>
        <p>Please contact an admin to link your account to an author profile.</p>
      </div>`;
    return;
  }

  const API_BASE = "https://premedical-dismally-tillie.ngrok-free.dev";
  const container = document.getElementById("authorNovelsContainer");
  
  async function fetchNovels() {
    try {
      const response = await fetch(`${API_BASE}/api/author/novels`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        }
      });
      if (response.ok) {
        const novels = await response.json();
        renderNovels(novels);
      } else if (response.status === 401 || response.status === 403) {
        alert("Session expired or access denied.");
        window.location.href = "index.html";
      } else {
        container.innerHTML = `<div class="col-12 text-center text-danger">Failed to load novels.</div>`;
      }
    } catch (err) {
      console.error("Error fetching author novels:", err);
    }
  }

  function renderNovels(novels) {
    if (novels.length === 0) {
      container.innerHTML = `<div class="col-12 text-center text-white-50 mt-5"><h4>You haven't published any novels yet.</h4></div>`;
      return;
    }

    container.innerHTML = "";
    novels.forEach(n => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4 mb-4";
      card.innerHTML = `
        <div class="card bg-secondary text-white border-0 shadow h-100 rounded-4 overflow-hidden">
          <img src="${n.ImagePath || 'imgs/default_novel.jpg'}" class="card-img-top" alt="Cover" style="height: 250px; object-fit: cover;">
          <div class="card-body p-4">
            <h5 class="card-title fw-bold mb-3">${n.TitleEn}</h5>
            <div class="d-flex justify-content-between text-white-50 mb-3">
              <span><i class="bi bi-eye"></i> ${n.Views}</span>
              <span><i class="bi bi-star-fill text-warning"></i> ${n.Rating.toFixed(1)}</span>
              <span><i class="bi bi-currency-dollar"></i> ${n.Price.toFixed(2)}</span>
            </div>
            <p class="card-text small text-white-50" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
              ${n.DescriptionEn}
            </p>
          </div>
          <div class="card-footer bg-dark border-0 p-3 text-center">
            <a href="novel_details.html?id=${n.Id}" class="btn btn-outline-light btn-sm w-100">Manage Novel</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Fetch categories to populate dropdown
  async function fetchCategoriesForSelect() {
    try {
      const res = await fetch(`${API_BASE}/api/categories`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      if (res.ok) {
        const cats = await res.json();
        const select = document.getElementById("novelCategories");
        select.innerHTML = "";
        cats.forEach(c => {
          select.innerHTML += `<option value="${c.id}">${c.en}</option>`;
        });
      }
    } catch(err) {
      console.error(err);
    }
  }

  document.getElementById("newNovelForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const titleEn = document.getElementById("novelTitle").value;
    const descriptionEn = document.getElementById("novelDesc").value;
    const price = parseFloat(document.getElementById("novelPrice").value);
    const imagePath = document.getElementById("novelImage").value;
    
    const select = document.getElementById("novelCategories");
    const cats = Array.from(select.selectedOptions).map(opt => opt.value);

    try {
      const response = await fetch(`${API_BASE}/api/author/novels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ titleEn, descriptionEn, price, imagePath, cats })
      });

      if (response.ok) {
        const modalEl = document.getElementById('newNovelModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        fetchNovels(); // Refresh list
        document.getElementById("newNovelForm").reset();
      } else {
        const errData = await response.json();
        alert("Failed to publish novel: " + (errData.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error creating novel:", err);
      alert("Error publishing novel.");
    }
  });

  // Initial load
  fetchNovels();
  fetchCategoriesForSelect();
});
