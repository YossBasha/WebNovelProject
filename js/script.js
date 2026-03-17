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
// Listen for the form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Stops the default page reload
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // 'fetch' sends the data to Express backend
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      // Read the backend's reply
      const data = await response.json();
      const messageDiv = document.getElementById("loginMessage");

      if (response.ok) {
        messageDiv.innerHTML = `<span class="text-success">${data.message}</span>`;
      } else {
        messageDiv.innerHTML = `<span class="text-danger">${data.message}</span>`;
      }
    } catch (error) {
      console.error("Error communicating with backend:", error);
    }
  });
