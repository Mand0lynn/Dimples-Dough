document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("header.html")
    .then(res => res.text())
    .then(data => { document.getElementById("header").innerHTML = data; })
    .catch(err => console.error("Error loading header:", err));

  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(data => { document.getElementById("footer").innerHTML = data; })
    .catch(err => console.error("Error loading footer:", err));

  // Load carousel if #carousel exists
  if (document.getElementById("carousel")) {
    fetch("carousel.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("carousel").innerHTML = html;
        initCarousel();
      })
      .catch(err => console.error("Error loading carousel:", err));
  }

  // Page-specific logic (optional)
  if (document.body.classList.contains("menu-page")) {
    // Menu scripts here
  }
  if (document.body.classList.contains("events-page")) {
    // Events scripts here
  }
  if (document.body.classList.contains("about-page")) {
    // About scripts here
  }

  // Carousel logic (looping)
  function initCarousel() {
    const items = document.querySelectorAll(".carousel-item");
    const total = items.length;
    let currentIndex = 0;

    // Shift items based on currentIndex
    function updateCarousel() {
      const offset = currentIndex * 100;
      items.forEach(item => {
        item.style.transform = `translateX(-${offset}%)`;
      });
    }

    // Move slides left/right, wrapping around
    window.moveSlide = function(n) {
      currentIndex += n;
      currentIndex = (currentIndex + total) % total;
      updateCarousel();
    };

    // Initial position
    updateCarousel();
  }
});
