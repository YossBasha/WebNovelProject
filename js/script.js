function scrollSlider(sliderId, direction) {
  const slider = document.getElementById(sliderId);
  // Target the first card inside the specific slider provided
  const firstCard = slider.querySelector(".card");

  if (firstCard) {
    // Get the actual width of the card in this section
    const cardWidth = firstCard.offsetWidth;

    // Get the actual gap (spacing) set for this specific container
    const style = window.getComputedStyle(slider);
    const gap = parseInt(style.columnGap) || 0;

    // The scroll amount is now unique to the section's layout
    const scrollAmount = cardWidth + gap;

    slider.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
}
// ==================================================== Authentication JS
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Check Authentication State on Page Load ---
  checkAuthState();

  // --- 2. Handle Login Form Submission ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const messageDiv = document.getElementById("loginMessage");

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        });

        const data = await response.json();

        if (response.ok) {
          messageDiv.innerHTML = `<span class="text-success">${data.message}</span>`;

          // Save user data to LocalStorage
          // Fallback to the first part of their email if your backend doesn't send a username yet
          const username = data.username || email.split("@")[0];
          const token = data.token || "session-active";

          localStorage.setItem("userToken", token);
          localStorage.setItem("userName", username);

          // Wait 1 second so the user sees the success message
          setTimeout(() => {
            // Close the modal
            const modalElement = document.getElementById("loginModal");
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();

            // Clean up the form
            loginForm.reset();
            messageDiv.innerHTML = "";

            // Update the Navbar UI
            checkAuthState();
          }, 1000);
        } else {
          messageDiv.innerHTML = `<span class="text-danger">${data.message}</span>`;
        }
      } catch (error) {
        console.error("Error communicating with backend:", error);
        messageDiv.innerHTML = `<span class="text-danger">Failed to connect to server.</span>`;
      }
    });
  }

  // --- 3. Handle Logout ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the link from jumping to the top of the page

      // Clear the local storage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");

      // Update the UI back to logged-out state
      checkAuthState();
    });
  }
});

// ==================================================== Helper Functions

// Function to toggle navbar elements based on login status
function checkAuthState() {
  const token = localStorage.getItem("userToken");
  const username = localStorage.getItem("userName");

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
