document.addEventListener("DOMContentLoaded", function () {
    // Load Header and Footer
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data)
        .catch(error => console.error("Error loading header:", error));

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data)
        .catch(error => console.error("Error loading footer:", error));

    // Slideshow Logic
    let slideIndex = 0;
    let slides = document.querySelectorAll(".slide");
    let isPaused = false;
    let interval = setInterval(showSlides, 8000); // Slower transition (8 seconds per slide)

    function showSlides(next = true) {
        slides.forEach(slide => slide.style.opacity = "0");
        slideIndex = next ? (slideIndex + 1) % slides.length : (slideIndex - 1 + slides.length) % slides.length;
        slides[slideIndex].style.opacity = "1";
    }

    function prevSlide() {
        showSlides(false);
        restartSlideshow();
    }

    function nextSlide() {
        showSlides(true);
        restartSlideshow();
    }

    function restartSlideshow() {
        if (!isPaused) {
            clearInterval(interval);
            interval = setInterval(showSlides, 8000);
        }
    }

    document.querySelector(".prev").addEventListener("click", prevSlide);
    document.querySelector(".next").addEventListener("click", nextSlide);

    function toggleSlideshow() {
        let playPauseIcon = document.getElementById("playPauseIcon");

        if (isPaused) {
            interval = setInterval(showSlides, 8000);
            playPauseIcon.innerHTML = "⏸"; // Pause icon
        } else {
            clearInterval(interval);
            playPauseIcon.innerHTML = "▶"; // Play icon
        }

        isPaused = !isPaused;
    }

    showSlides(); // Start the slideshow

    // Carousel Logic
    let carouselIndex = 0;
    const carouselItems = document.querySelectorAll(".carousel-item");
    const totalItems = carouselItems.length;
    const visibleItems = 3; // Display three images at a time

    function moveCarousel(direction) {
        carouselIndex += direction;

        if (carouselIndex < 0) {
            carouselIndex = 0; // Prevent moving before first item
        } else if (carouselIndex > totalItems - visibleItems) {
            carouselIndex = totalItems - visibleItems; // Prevent moving past last set
        }

        const offset = -(carouselIndex * 100 / visibleItems);
        document.querySelector(".carousel-wrapper").style.transform = `translateX(${offset}%)`;
    }

    // Attach event listeners to carousel arrows
    document.querySelector(".carousel-arrow.prev").addEventListener("click", () => moveCarousel(-1));
    document.querySelector(".carousel-arrow.next").addEventListener("click", () => moveCarousel(1));
});
