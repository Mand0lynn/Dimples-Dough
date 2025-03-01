document.addEventListener("DOMContentLoaded", () => {
    // Load header, footer, and carousel on all pages
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);

    if (document.getElementById("carousel")) {
        fetch("carousel.html")
            .then(response => response.text())
            .then(data => document.getElementById("carousel").innerHTML = data);
    }

    // Menu page interactivity (if needed)
    if (document.body.classList.contains("menu-page")) {
        // Add menu-specific scripts here (if needed)
    }

    // Events page interactivity (if needed)
    if (document.body.classList.contains("events-page")) {
        // Add event-specific scripts here (if needed)
    }

    // About page interactivity (if needed)
    if (document.body.classList.contains("about-page")) {
        // Add about-specific scripts here (if needed)
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlides() {
        slides.forEach(slide => slide.style.opacity = "0"); // Hide all slides
        slideIndex = (slideIndex + 1) % slides.length; // Move to next slide
        slides[slideIndex].style.opacity = "1"; // Show current slide
        setTimeout(showSlides, 4000); // Change every 4 seconds
    }

    showSlides(); // Start slideshow
});
