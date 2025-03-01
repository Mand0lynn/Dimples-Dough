document.addEventListener("DOMContentLoaded", function () {
  /***********************************************************
   * 1) LOAD HEADER & FOOTER
   ***********************************************************/
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    })
    .catch(error => console.error("Error loading header:", error));

  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));

  /***********************************************************
   * 2) LOAD & INSERT THE CAROUSEL HTML
   ***********************************************************/
  fetch("carousel.html")
    .then(response => response.text())
    .then(html => {
      // Insert carousel markup into an element with ID "carouselSection"
      // (Make sure your main page has <div id="carouselSection"></div>)
      document.getElementById("carouselSection").innerHTML = html;

      // Once the carousel HTML is in place, initialize carousel logic
      initCarousel();
    })
    .catch(error => console.error("Error loading carousel:", error));

  /***********************************************************
   * 3) TOP SLIDESHOW LOGIC
   ***********************************************************/
  let slideIndex = 0;
  let slides = document.querySelectorAll(".slide");
  let isPaused = false;
  let interval;

  // Start the slideshow
  showSlides(false); // Show the first slide
  startSlideshow();  // Begin auto-rotation

  // Show/hide slides
  function showSlides(next = true) {
    // Hide all slides
    slides.forEach(slide => (slide.style.opacity = "0"));

    // Move index forward or backward
    if (next) {
      slideIndex = (slideIndex + 1) % slides.length;
    } else {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    }

    // Show the current slide
    slides[slideIndex].style.opacity = "1";
  }

  // Auto-rotate every 8 seconds
  function startSlideshow() {
    interval = setInterval(() => showSlides(true), 8000);
  }

  // If user clicks Prev
  function prevSlide() {
    showSlides(false);
    restartSlideshow();
  }

  // If user clicks Next
  function nextSlide() {
    showSlides(true);
    restartSlideshow();
  }

  // Restart the timer if not paused
  function restartSlideshow() {
    if (!isPaused) {
      clearInterval(interval);
      startSlideshow();
    }
  }

  // Play/Pause toggle
  function toggleSlideshow() {
    let playPauseIcon = document.getElementById("playPauseIcon");
    if (isPaused) {
      // Resume
      startSlideshow();
      playPauseIcon.innerHTML = "⏸";
    } else {
      // Pause
      clearInterval(interval);
      playPauseIcon.innerHTML = "▶";
    }
    isPaused = !isPaused;
  }

  // Expose slideshow functions to the global scope (so HTML buttons work)
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.toggleSlideshow = toggleSlideshow;

  /***********************************************************
   * 4) CAROUSEL LOGIC (INITIALIZED AFTER HTML IS LOADED)
   ***********************************************************/
  function initCarousel() {
    // We'll look up the newly inserted .carousel-item elements
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll(".carousel-item");
    const totalItems = carouselItems.length;

    // If you want multiple items visible at once, adjust this:
    const itemsToShow = 3;

    // Shift items left/right based on currentIndex
    function updateCarousel() {
      const offset = currentIndex * 100; // basic approach: 100% per "shift"
      carouselItems.forEach(item => {
        item.style.transform = `translateX(-${offset}%)`;
      });
    }

    // Move slide left/right by 1
    window.moveSlide = function (n) {
      currentIndex += n;

      // Keep within bounds
      if (currentIndex < 0) {
        currentIndex = totalItems - itemsToShow;
      } else if (currentIndex > totalItems - itemsToShow) {
        currentIndex = 0;
      }
      updateCarousel();
    };

    // Initialize
    updateCarousel();
  }
});
