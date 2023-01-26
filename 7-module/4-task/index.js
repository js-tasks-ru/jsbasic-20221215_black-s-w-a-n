import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem;
  leftPercents;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress" style="width: 0%;"></div>        
        <div class="slider__steps">
          <span class="slider__step-active"></span>
          ${'<span></span>'.repeat(this.steps - 1)}
        </div>
      </div>
    `);        
  }

  addEventListeners() {
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderThumb.ondragstart = () => false;

    this.sliderThumb.addEventListener('pointerdown', this.pointerDown);

    this.sliderChange();     
  }

  pointerDown = event => { 

    event.preventDefault();    
    this.draggin = document.querySelector('.slider');
    this.draggin.classList.add('slider_dragging');
    
    document.addEventListener('pointermove', this.pointerMove);
    document.addEventListener('pointerup', this.pointerUp);
    
  }  

  pointerMove = (event) => {    
    
    event.preventDefault();
     
    let left = this.leftRelative(event);
    
    this.leftPercents = left * 100;
    
    this.segments = this.steps - 1;
    let approximateValue = left * this.segments;
    this.value = Math.round(approximateValue);
      

    const sliderValue = this.elem.querySelector('.slider__value');
    this.progress = this.elem.querySelector('.slider__progress');   
      
    sliderValue.textContent = `${this.value}`;
    this.sliderThumb.style.left = `${this.leftPercents}%`;
    this.progress.style.width = `${this.leftPercents}%`;       
  }

  pointerUp = () => {
    
    document.removeEventListener('pointermove', this.pointerMove);
    document.removeEventListener('pointerup', this.pointerUp);
    
    this.draggin.classList.remove('slider_dragging');
      
    const allSpan = this.elem.querySelectorAll('.slider__steps > span');
    allSpan.forEach(span => span.classList.remove('slider__step-active'));
    allSpan[this.value].classList.add('slider__step-active');
    
    this.sliderThumb.style.left = `${(this.value / this.segments) * 100}%`;
    this.progress.style.width = `${(this.value / this.segments) * 100}%`;
         
  }

  leftRelative(event) {
    let Left = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    if (Left < 0) { Left = 0; }
    if (Left > 1) { Left = 1; }

    return Left;
  }

  sliderChange() {
    this.elem.addEventListener('click', event => {
      event.target.dispatchEvent(new CustomEvent("slider-change", {detail: this.value, bubbles: true}));      
    });  

    this.elem.addEventListener("slider-change", event => {
      return event.detail;
    });
  }

}

