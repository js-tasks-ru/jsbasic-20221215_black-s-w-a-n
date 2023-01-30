export default class StepSlider {
  elem;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.sliderSlide();
    this.sliderChange();
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('slider');
    const element = `
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress" style="width: 0%;"></div>        
        <div class="slider__steps">
          <span class="slider__step-active"></span>
        </div>
    `;    
    
    div.innerHTML = element;
    this.elem = div;

    let spanValue = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps - 1; i++) {      
      spanValue.insertAdjacentHTML('beforeEnd', '<span></span>');
    }
  }

  sliderSlide() {
    this.elem.addEventListener('click', event => {
      
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = this.value / segments * 100;

      const sliderValue = this.elem.querySelector('.slider__value');
      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');   
      
      sliderValue.textContent = `${this.value}`;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;      
    });
  }

  sliderChange() {
    this.elem.addEventListener('click', event => {
      event.target.dispatchEvent(new CustomEvent("slider-change", {detail: this.value, bubbles: true}));

      const allSpan = this.elem.querySelectorAll('.slider__steps > span');
      allSpan.forEach(span => span.classList.remove('slider__step-active'));
      event.target.classList.add('slider__step-active');
    });  

    this.elem.addEventListener("slider-change", event => {
      return event.detail;
    });
  }
  
}
