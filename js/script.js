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
