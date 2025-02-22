var swiper = new Swiper('.card-wrapper', {
  // Optional parameters
  
  loop: true,
  spaceBetween: 20,
  slidesPerView: 3,
  slidesPerGroup: 3,
  loopFillGroupWithBlank: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

