// ==================================================== Helper Functions

// Function to toggle navbar elements based on login status
// Function to toggle navbar elements based on login status
function checkAuthState() {
  // FIXED: Check localStorage first, and if it's empty, check sessionStorage
  const token =
    localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  const username =
    localStorage.getItem("userName") || sessionStorage.getItem("userName");

  const signInItem = document.getElementById("signInItem");
  const registerItem = document.getElementById("registerItem");
  const userProfileItem = document.getElementById("userProfileItem");

  // Make sure elements exist before trying to modify them
  if (!signInItem || !registerItem || !userProfileItem) return;

  if (token) {
    // User IS logged in
    signInItem.classList.add("d-none");
    registerItem.classList.add("d-none");
    userProfileItem.classList.remove("d-none");

    // Optional: Set the profile name in the dropdown to their actual username
    const profileNameElement = userProfileItem.querySelector(".fw-bold");
    if (profileNameElement && username) {
      profileNameElement.textContent = username;
    }
  } else {
    // User is NOT logged in
    signInItem.classList.remove("d-none");
    registerItem.classList.remove("d-none");
    userProfileItem.classList.add("d-none");
  }
}

// ==================================================== Authentication JS
document.addEventListener("DOMContentLoaded", () => {
  // 1. Check if user is logged in to update navbar
  checkAuthState();

  // 2. Protect Personal Library Link (Runs on Index & Details pages)
  const personalLibraryLink = document.getElementById("personalLibraryLink");
  if (personalLibraryLink) {
    personalLibraryLink.addEventListener("click", (e) => {
      const token =
        localStorage.getItem("userToken") ||
        sessionStorage.getItem("userToken");

      if (!token) {
        e.preventDefault(); // Stop navigation
        const loginModalEl = document.getElementById("loginModal");
        const loginModal =
          bootstrap.Modal.getInstance(loginModalEl) ||
          new bootstrap.Modal(loginModalEl);
        loginModal.show();
      }
    });
  }

  // --- 2. Handle Login Form Submission ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // FIXED: Targeted "email" to match your HTML ID
      const emailVal = document.getElementById("email").value;
      const passwordVal = document.getElementById("password").value;
      const rememberMe = document.getElementById("rememberMe").checked;
      const messageDiv = document.getElementById("loginMessage");

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Assuming your backend is looking for "username" per your first message.
            // We pass the emailVal in here so the backend can evaluate it.
            username: emailVal,
            password: passwordVal,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          messageDiv.innerHTML = `<span class="text-success">${data.message}</span>`;

          // Save user data
          const finalUsername = data.username || emailVal;
          const token = data.token || "session-active";
          const storage = rememberMe ? localStorage : sessionStorage;

          storage.setItem("userToken", token);
          storage.setItem("userName", finalUsername);

          // Refresh the page after 1 second
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          messageDiv.innerHTML = `<span class="text-danger">${data.message}</span>`;
        }
      } catch (error) {
        console.error("Connection Error:", error);
        messageDiv.innerHTML = `<span class="text-danger">Failed to connect to server.</span>`;
      }
    });
  }

  // --- 3. Handle Register Form Submission ---
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

      // Do passwords match?
      if (password !== confirmPassword) {
        messageDiv.innerHTML = `<span class="text-danger">Passwords do not match!</span>`;
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          messageDiv.innerHTML = `<span class="text-success">Registration successful! Logging in...</span>`;

          const token = data.token || "session-active";
          localStorage.setItem("userToken", token);
          localStorage.setItem("userName", username);

          setTimeout(() => {
            // Refresh the page to log the user in instantly
            window.location.reload();
          }, 1500);
        } else {
          messageDiv.innerHTML = `<span class="text-danger">${data.message}</span>`;
        }
      } catch (error) {
        console.error("Error communicating with backend:", error);
        messageDiv.innerHTML = `<span class="text-danger">Failed to connect to server.</span>`;
      }
    });
  }

  // --- 4. Handle Logout ---
  // --- Handle Logout ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Clear the local storage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");

      // Clear the session storage
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("userName");

      // Refresh the page to reset the state back to logged-out
      window.location.reload();
      checkAuthState();
    });
  }
});

// Slider function stays outside since it's called directly from HTML onclick attributes
function scrollSlider(sliderId, direction) {
  const slider = document.getElementById(sliderId);
  const firstCard = slider.querySelector(".card");

  if (firstCard) {
    const cardWidth = firstCard.offsetWidth;
    const style = window.getComputedStyle(slider);
    const gap = parseInt(style.columnGap) || 0;
    const scrollAmount = cardWidth + gap;

    slider.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
}
