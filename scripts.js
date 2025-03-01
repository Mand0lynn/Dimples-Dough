// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Load header: Fetches and inserts the header content
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    })
    .catch(err => console.error("Error loading header:", err));

  // Load footer: Fetches and inserts the footer content
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("Error loading footer:", err));

  // Load carousel if #carousel exists: Fetches and inserts the carousel content
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

    // Handle form submission
    contactForm.addEventListener("submit", e => {
      e.preventDefault(); // Prevents the form from submitting the traditional way
      formMessage.style.display = "block"; // Shows the thank-you message
      contactForm.reset(); // Resets the form fields
    });
  }

  // Page-specific logic (optional): Adds scripts specific to certain pages
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
  let slideIndex = 0; // Tracks the current slide index
  let slides = document.querySelectorAll(".slide"); // Gets all slide elements
  let isPaused = false; // Tracks whether the slideshow is paused
  let interval; // Stores the interval ID for the slideshow

  // Hide all slides except the first
  slides.forEach(slide => (slide.style.opacity = "0"));
  if (slides.length) slides[0].style.opacity = "1"; // Show the first slide

  // Show or hide slides
  function showSlides(next = true) {
    slides.forEach(slide => (slide.style.opacity = "0")); // Hide all slides
    if (next) {
      slideIndex = (slideIndex + 1) % slides.length; // Move to the next slide
    } else {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length; // Move to the previous slide
    }
    slides[slideIndex].style.opacity = "1"; // Show the current slide
  }

  // Start auto-rotation every 8 seconds
  function startSlideshow() {
    interval = setInterval(() => showSlides(true), 6000); // Rotate slides every 6 seconds
  }

  // Restart if not paused
  function restartSlideshow() {
    if (!isPaused) {
      clearInterval(interval); // Clear the existing interval
      startSlideshow(); // Restart the slideshow
    }
  }

  // Arrow buttons: Functions for navigating slides
  window.prevSlide = function() {
    showSlides(false); // Show the previous slide
    restartSlideshow(); // Restart the slideshow
  };
  window.nextSlide = function() {
    showSlides(true); // Show the next slide
    restartSlideshow(); // Restart the slideshow
  };

  // Play/Pause toggle: Toggles the slideshow between play and pause
  window.toggleSlideshow = function() {
    let playPauseIcon = document.getElementById("playPauseIcon");
    if (isPaused) {
      startSlideshow(); // Resume the slideshow
      playPauseIcon.textContent = "⏸"; // Update the icon to pause
    } else {
      clearInterval(interval); // Pause the slideshow
      playPauseIcon.textContent = "▶"; // Update the icon to play
    }
    isPaused = !isPaused; // Toggle the paused state
  };

  // Initialize slideshow if slides exist
  if (slides.length) {
    startSlideshow(); // Start the slideshow automatically
  }
});