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
});
