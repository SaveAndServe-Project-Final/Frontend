import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: false
})
export class CarouselComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) {
    register();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initSwiper();
    }, 0);
  }

  initSwiper() {
    const swiperEl = this.el.nativeElement.querySelector('swiper-container');

    if (swiperEl) {
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        effect: 'slide',
        speed: 800
      };

      Object.assign(swiperEl, swiperParams);

      const prevButton = document.createElement('div');
      prevButton.className = 'swiper-button-prev';

      const nextButton = document.createElement('div');
      nextButton.className = 'swiper-button-next';

      const pagination = document.createElement('div');
      pagination.className = 'swiper-pagination';

      swiperEl.appendChild(prevButton);
      swiperEl.appendChild(nextButton);
      swiperEl.appendChild(pagination);

      swiperEl.initialize();

      const swiperInstance = swiperEl.swiper;
      if (swiperInstance && !swiperInstance.autoplay.running) {
        console.log('Iniciando autoplay manualmente');
        swiperInstance.autoplay.start();
      }
    }
  }
}