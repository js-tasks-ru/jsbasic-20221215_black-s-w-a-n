export default class StepSlider {
  elem;
  leftPercents;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.pointerDown();
    
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

  pointerDown() {
    const sliderThumb = this.elem.querySelector('.slider__thumb');
    sliderThumb.addEventListener('pointerdown', event => {
      event.preventDefault();
      const rootEl = document.querySelector('.slider');
      rootEl.classList.add('slider_dragging');
      this.pointerMove();
      this.pointerUp();     
      this.sliderChange();
      this.prevent();
    });
  }

  pointerMove() {    
    document.addEventListener('pointermove', event => {
      event.preventDefault();
          
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }
      
      if (leftRelative > 1) {
        leftRelative = 1;
      }

      this.leftPercents = leftRelative * 100;

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      

      const sliderValue = this.elem.querySelector('.slider__value');
      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');   
      
      sliderValue.textContent = `${this.value}`;
      thumb.style.left = `${this.leftPercents}%`;
      progress.style.width = `${this.leftPercents}%`;       
    });        
  }

  pointerUp() {    
    document.addEventListener('pointerup', (event) => {
      const rootEl = document.querySelector('.slider');
      rootEl.classList.remove('slider_dragging');
      
      const allSpan = this.elem.querySelectorAll('.slider__steps > span');
      allSpan.forEach(span => span.classList.remove('slider__step-active'));
      allSpan[this.value].classList.add('slider__step-active');
    });    
  }

  sliderChange() {
    this.elem.addEventListener('pointerup', event => {
      event.target.dispatchEvent(new CustomEvent("slider-change", {detail: this.value, bubbles: true}));      
    });  

    this.elem.addEventListener("slider-change", event => {
      return event.detail;
    });
  }

  prevent() {
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
  }
}
