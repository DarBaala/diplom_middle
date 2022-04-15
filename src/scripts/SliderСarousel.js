"use strict";
class SliderСarousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    infinite = false,
    position = 0,
    slidesToShow = 5,
    nameSlider,
  }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.slidesToShow = slidesToShow;
    this.nameSlider = nameSlider;
    this.options = {
      position,
      infinite,
      widthSlide: Math.floor(100 / this.slidesToShow),
    };
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
  }
  init() {
    this.addClass();
    this.addStyle();
    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
  }
  addClass() {
    this.main.classList.add(`${this.nameSlider}-slider`);
    this.wrap.classList.add(`${this.nameSlider}-slider__wrap`);
    for (const item of this.slides) {
      item.classList.add(`${this.nameSlider}-slider__item`);
    }
  }
  addStyle() {
    const style = document.createElement("style");
    style.id = "sliderCarusel-style";
    style.textContent = `
    .${this.nameSlider}-slider{
      overflow: hidden !important;
      position: relative;
    }
    .${this.nameSlider}-slider__wrap{
      display: flex !important;
      transition: transform 0.5s !important;
      will-change: transform !important;
    }
    .${this.nameSlider}-slider__item{
      flex: 0 0 ${this.options.widthSlide}% !important;
      margin: 0 0 !important;
    }
    `;
    document.head.appendChild(style);
  }
  controlSlider() {
    this.prev.addEventListener("click", this.prevSlider.bind(this));
    this.next.addEventListener("click", this.nextSlider.bind(this));
  }
  prevSlider() {
    if (this.options.infinite || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.slides.length - this.slidesToShow;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }
  nextSlider() {
    if (
      this.options.infinite ||
      this.options.position < this.slides.length - this.slidesToShow
    )
      ++this.options.position;
    if (this.options.position > this.slides.length - this.slidesToShow) {
      this.options.position = 0;
    }
    this.wrap.style.transform = `translateX(-${
      this.options.position * this.options.widthSlide
    }%)`;
  }

  addArrow() {}
}
