document.addEventListener("DOMContentLoaded", () => {
  // Load header & footer
  fetch("header.html")
    .then(r => r.text())
    .then(d => document.getElementById("header").innerHTML = d);

  fetch("footer.html")
    .then(r => r.text())
    .then(d => document.getElementById("footer").innerHTML = d);

  // If there's a #carousel on the page, load carousel.html and init
  const c = document.getElementById("carousel");
  if (c) {
    fetch("carousel.html")
      .then(r => r.text())
      .then(d => {
        c.innerHTML = d;
        initCarousel(); // Only call here, after the partial is inserted
      });
  }

  // Page-specific checks (menu, events, about, etc.)
  if (document.body.classList.contains("menu-page")) {
    // ...
  }
  if (document.body.classList.contains("events-page")) {
    // ...
  }
  if (document.body.classList.contains("about-page")) {
    // ...
  }
});

function initCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return; // If no carousel-track found, exit

  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");

  const slideWidth = 320; // 300px + 20px margin
  const partialPeek = 80;
  const numRealSlides = slides.length;
  if (!numRealSlides) return;

  // Clone first & last slides for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[numRealSlides - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(track.children);

  function getTranslateX(i) {
    return i * slideWidth - partialPeek;
  }

  // Start at index=1 so real slide #0 is partially visible on the left
  let currentIndex = 1;
  track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;

  function moveToSlide(i) {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${getTranslateX(i)}px)`;
    currentIndex = i;
  }

  // Next button click handler
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      moveToSlide(currentIndex + 1);
    });
  }

  // Previous button click handler
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      moveToSlide(currentIndex - 1);
    });
  }

  // Handle the transitionend event for infinite looping
  track.addEventListener("transitionend", () => {
    // If we land on the last clone (allSlides[allSlides.length - 1])
    if (allSlides[currentIndex] === allSlides[allSlides.length - 1]) {
      track.style.transition = "none"; // Fix typo here
      currentIndex = 1; // Jump to the first real slide
      track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;
    }
    // If we land on the first clone (allSlides[0])
    else if (allSlides[currentIndex] === allSlides[0]) {
      track.style.transition = "none"; // Fix typo here
      currentIndex = numRealSlides; // Jump to the last real slide
      track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;
    }
  });
}

