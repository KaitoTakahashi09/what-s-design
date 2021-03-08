"use strict"

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  simulateTouch: false,
  observer: true,
  observeParents: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});