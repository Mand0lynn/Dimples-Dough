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
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[numRealSlides - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);
  const allSlides = Array.from(track.children);

  function getTranslateX(i) {
    return i * slideWidth - partialPeek;
  }

  let currentIndex = 2;
  track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;

  function moveToSlide(i) {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${getTranslateX(i)}px)`;
    currentIndex = i;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      moveToSlide(currentIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      moveToSlide(currentIndex - 1);
    });
  }

  track.addEventListener("transitionend", () => {
    if (allSlides[currentIndex] === allSlides[allSlides.length - 1]) {
      track.style.transition = "none";
      currentIndex = 1;
      track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;
    }
    if (allSlides[currentIndex] === allSlides[0]) {
      track.style.transition = "none";
      currentIndex = numRealSlides;
      track.style.transform = `translateX(-${getTranslateX(currentIndex)}px)`;
    }
  });
}
