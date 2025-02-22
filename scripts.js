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
