import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem
  constructor(slides) {
    this.slides = slides;
    this.count = 0;
    this.createCard();
    this.arrows();
    this.addProduct();
  }

  createCard() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        ${this.slides.map(({name, price, image, id}) => `
          <div class="carousel__slide" data-id="${id}">
            <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${price.toFixed(2)}</span>
              <div class="carousel__title">${name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>`).join('')}
        </div>
      </div>  
    `);
  }

  arrows() {
    let offset = 0;
    let offsetWidth = 988;
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
    const slide = this.elem.querySelector('.carousel__inner');
    leftArrow.style.display = 'none';
   
    this.elem.addEventListener('click', (event) => {
      
      if (event.target === rightArrow) {
        offset -= offsetWidth;
        slide.style.transform = `translateX(${offset}px)`;
        this.count += 1;

        if (offset <= (-offsetWidth * (this.slides.length - 1))) {
          event.target.style.display = 'none';
        } else {
          leftArrow.style.display = '';
        }
      }

      if (event.target === leftArrow) {
        offset += offsetWidth;
        slide.style.transform = `translateX(${offset}px)`;
        this.count -= 1;
      
        if (offset >= 0) {
          event.target.style.display = 'none';
        } else {
          rightArrow.style.display = '';
        }
      } 
    });
  }

  addProduct() {
    const buttonPlus = this.elem.querySelector('.carousel__inner');

    buttonPlus.addEventListener("click", event => {
      event.target.dispatchEvent(new CustomEvent("product-add", {detail: this.slides[this.count].id, bubbles: true}));
    });

    buttonPlus.addEventListener("product-add", event => {
      return event.detail;
    });
  }
}

