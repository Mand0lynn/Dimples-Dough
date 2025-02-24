document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(r => r.text())
    .then(d => document.getElementById("header").innerHTML = d);

  fetch("footer.html")
    .then(r => r.text())
    .then(d => document.getElementById("footer").innerHTML = d);

  const c = document.getElementById("carousel");
  if (c) {
    fetch("carousel.html")
      .then(r => r.text())
      .then(d => {
        c.innerHTML = d;
        initCarousel();
      });
  }

  if (document.body.classList.contains("menu-page")) {}

  if (document.body.classList.contains("events-page")) {}

  if (document.body.classList.contains("about-page")) {}
});

function initCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");
  const slideWidth = 320;
  const partialPeek = 80;
  const numRealSlides = slides.length;
  if (!numRealSlides) return;

  // Clone the first and last slides for infinite looping
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[numRealSlides - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);
  const allSlides = Array.from(track.children);

  function getTranslateX(i) {
    return i * slideWidth - partialPeek;
  }

  let currentIndex = 1; // Start at the first real slide (index 1 because of the cloned last slide)
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
    if (allSlides[currentIndex] === allSlides[allSlides.length - 1]) {
      // If we're at the last clone, jump to the first real slide without animation
      track.style.transition = "none";
      currentIndex = 1;
      track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;
    } else if (allSlides[currentIndex] === allSlides[0]) {
      // If we're at the first clone, jump to the last real slide without animation
      track.style.transition = "none";
      currentIndex = numRealSlides;
      track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;
    }
  });
}

// Initialize the carousel
initCarousel();
