document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    })
    .catch(err => console.error("Error loading header:", err));

  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("Error loading footer:", err));

  // Load carousel if #carousel exists
  if (document.getElementById("carousel")) {
    fetch("carousel.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("carousel").innerHTML = data;
      })
      .catch(err => console.error("Error loading carousel:", err));
  }

  // If the page has a contact form, set up submission logic
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");
  if (contactForm && formMessage) {
    formMessage.style.display = "none"; // Hide the thank-you message initially

    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      formMessage.style.display = "block";
      contactForm.reset();
    });
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

  // SLIDESHOW LOGIC (Top Banner)
  let slideIndex = 0;
  let slides = document.querySelectorAll(".slide");
  let isPaused = false;
  let interval;

  // Hide all slides except the first
  slides.forEach(slide => (slide.style.opacity = "0"));
  if (slides.length) slides[0].style.opacity = "1";

  // Show or hide slides
  function showSlides(next = true) {
    slides.forEach(slide => (slide.style.opacity = "0"));
    if (next) {
      slideIndex = (slideIndex + 1) % slides.length;
    } else {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    }
    slides[slideIndex].style.opacity = "1";
  }

  // Start auto-rotation every 8 seconds
  function startSlideshow() {
    interval = setInterval(() => showSlides(true), 8000);
  }

  // Restart if not paused
  function restartSlideshow() {
    if (!isPaused) {
      clearInterval(interval);
      startSlideshow();
    }
  }

  // Arrow buttons
  window.prevSlide = function() {
    showSlides(false);
    restartSlideshow();
  };
  window.nextSlide = function() {
    showSlides(true);
    restartSlideshow();
  };

  // Play/Pause toggle
  window.toggleSlideshow = function() {
    let playPauseIcon = document.getElementById("playPauseIcon");
    if (isPaused) {
      startSlideshow();
      playPauseIcon.textContent = "⏸";
    } else {
      clearInterval(interval);
      playPauseIcon.textContent = "▶";
    }
    isPaused = !isPaused;
  };

  // Initialize slideshow if slides exist
  if (slides.length) {
    startSlideshow();
  }
});
