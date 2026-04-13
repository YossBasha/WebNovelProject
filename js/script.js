// ====================================================
// NextPage Global Script
// ====================================================

const API_URL = "https://premedical-dismally-tillie.ngrok-free.dev";

// Toggles navbar elements based on login status
function checkAuthState() {
  const token =
    localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  const username =
    localStorage.getItem("userName") || sessionStorage.getItem("userName");

  const signInItem = document.getElementById("signInItem");
  const registerItem = document.getElementById("registerItem");
  const userProfileItem = document.getElementById("userProfileItem");

  if (!signInItem || !registerItem || !userProfileItem) return;

  if (token) {
    signInItem.classList.add("d-none");
    registerItem.classList.add("d-none");
    userProfileItem.classList.remove("d-none");

    const profileNameElement = userProfileItem.querySelector(".fw-bold");
    if (profileNameElement && username) {
      profileNameElement.textContent = username;
    }
  } else {
    signInItem.classList.remove("d-none");
    registerItem.classList.remove("d-none");
    userProfileItem.classList.add("d-none");
  }
}

// Helper: Show Login Modal
function showLoginModal() {
  const loginModalEl = document.getElementById("loginModal");
  if (!loginModalEl) return;
  const loginModal =
    bootstrap.Modal.getInstance(loginModalEl) ||
    new bootstrap.Modal(loginModalEl);
  loginModal.show();
}

// Helper: Smooth Scroll Slider
function scrollSlider(sliderId, direction) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const firstCard = slider.querySelector(".novel-link-wrapper");
  const cardWidth = firstCard ? firstCard.offsetWidth : 220;
  const gap = parseInt(window.getComputedStyle(slider).gap) || 16;
  const scrollAmount = cardWidth + gap;

  // RTL handling: In RTL, progress (Next) is towards negative scrollLeft.
  const isRTL = document.documentElement.dir === "rtl";
  const effectiveDirection = isRTL ? -direction : direction;

  const startScroll = slider.scrollLeft;
  const targetScroll = startScroll + effectiveDirection * scrollAmount;
  const distance = targetScroll - startScroll;
  const duration = 350;
  let startTime = null;

  function animateScroll(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    slider.scrollLeft = startScroll + distance * easeOut;
    if (timeElapsed < duration) window.requestAnimationFrame(animateScroll);
  }
  window.requestAnimationFrame(animateScroll);
}

// ====================================================
// Event Listeners
// ====================================================

document.addEventListener("DOMContentLoaded", () => {
  checkAuthState();

  // --- Dynamic Navbar Visibility ---
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && (href === currentPage || href === `./${currentPage}`)) {
      // Hide the parent li of the current page link
      link.parentElement.classList.add("d-none");
    }
  });

  // --- Protected Links ---
  const personalLibraryLink = document.getElementById("personalLibraryLink");
  if (personalLibraryLink) {
    personalLibraryLink.addEventListener("click", (e) => {
      const token =
        localStorage.getItem("userToken") ||
        sessionStorage.getItem("userToken");
      if (!token) {
        e.preventDefault();
        showLoginModal();
      }
    });
  }

  // --- Auth Form: Login ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const emailVal = document.getElementById("email").value;
      const passwordVal = document.getElementById("password").value;
      const rememberMe = document.getElementById("rememberMe").checked;
      const messageDiv = document.getElementById("loginMessage");

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: emailVal, password: passwordVal }),
        });

        const data = await response.json();
        if (response.ok) {
          messageDiv.innerHTML = `<span class="text-success">${data.message}</span>`;
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("userToken", data.token || "session-active");
          storage.setItem("userName", data.username || emailVal);
          setTimeout(() => window.location.reload(), 800);
        } else {
          messageDiv.innerHTML = `<span class="text-danger">${data.message}</span>`;
        }
      } catch (error) {
        messageDiv.innerHTML = `<span class="text-danger">Authentication server offline.</span>`;
      }
    });
  }

  // --- Auth Form: Register ---
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = document.getElementById("regUsername").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirmPassword =
        document.getElementById("regConfirmPassword").value;
      const messageDiv = document.getElementById("registerMessage");

      if (password !== confirmPassword) {
        messageDiv.innerHTML = `<span class="text-danger">Passwords do not match!</span>`;
        return;
      }

      try {
        const response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          messageDiv.innerHTML = `<span class="text-success">Success! Redirecting...</span>`;
          localStorage.setItem("userToken", data.token || "session-active");
          localStorage.setItem("userName", username);
          setTimeout(() => window.location.reload(), 1000);
        } else {
          messageDiv.innerHTML = `<span class="text-danger">${data.message}</span>`;
        }
      } catch (error) {
        messageDiv.innerHTML = `<span class="text-danger">Registration server offline.</span>`;
      }
    });
  }

  // --- Logout Logic ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ["userToken", "userName"].forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      window.location.reload();
    });
  }

  // --- Slider Controls (Event Delegation) ---
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".scroll-btn");
    if (btn) {
      const direction = btn.classList.contains("left") ? -1 : 1;
      const sliderId =
        btn.getAttribute("data-slider") ||
        btn.previousElementSibling?.id ||
        btn.nextElementSibling?.id;

      // Special logic for index.html button structure
      const actualSliderId =
        btn.parentNode.querySelector(".featured-novels")?.id || sliderId;
      if (actualSliderId) scrollSlider(actualSliderId, direction);
    }

    // Support for the secondary slider buttons in index.html
    const customNavBtn = e.target.closest(".custom-nav-btn");
    if (customNavBtn) {
      const direction = customNavBtn.querySelector(".bi-arrow-left") ? -1 : 1;
      scrollSlider("bestSellerSlider", direction);
    }
  });

  // --- Initialize UI Enhancements ---
  initToasts();
  initScrollReveal();
});

// ====================================================
// UI Enhancements Helpers
// ====================================================

function initToasts() {
  if (!document.getElementById("toastContainer")) {
    const container = document.createElement("div");
    container.id = "toastContainer";
    document.body.appendChild(container);
  }
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `np-toast ${type}`;

  const icon =
    type === "success" ? "bi-check-circle-fill" : "bi-exclamation-circle-fill";
  toast.innerHTML = `<i class="bi ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  // Remove toast after animation completes
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal-on-scroll")
    .forEach((el) => observer.observe(el));
}

// Global exposure
window.showToast = showToast;
