import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem
  constructor(categories) {
    this.categories = categories;
    this.createElement();
    this.scrollMenu();
    this.addRibbon();
  }

  createElement() {
    this.elem = createElement(`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">      
      ${this.categories.map(({id, name}) => `
      <a href="#" class="ribbon__item" data-id=${id}>${name}</a>
      `).join('')}
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `);
  }

  scrollMenu() {
    const menu = this.elem.querySelector('.ribbon__inner');
    const leftArrow = this.elem.querySelector('.ribbon__arrow.ribbon__arrow_left');
    const rightArrow = this.elem.querySelector('.ribbon__arrow.ribbon__arrow_right');
    
    
    this.elem.addEventListener('click', (event) => {

      if (event.target === leftArrow) {
        menu.scrollBy(-350, 0);
        let scrollLeft = menu.scrollLeft;
             
        if (scrollLeft === 0) {
          leftArrow.classList.remove('ribbon__arrow_visible');
        } else if (!rightArrow.classList.contains('ribbon__arrow_visible')) {        
          rightArrow.classList.add('ribbon__arrow_visible');      
        }     
      }

      if (event.target === rightArrow) {
        
        menu.scrollBy(350, 0);
        let scrollWidth = menu.scrollWidth;
        let scrollLeft = menu.scrollLeft;
        let clientWidth = menu.clientWidth;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;

        if (scrollRight === 0) {
          rightArrow.classList.remove('ribbon__arrow_visible');
        } else if (!leftArrow.classList.contains('ribbon__arrow_visible')) {        
          leftArrow.classList.add('ribbon__arrow_visible');
        } 
      } 
    });
  }

  addRibbon() {
    const addItem = this.elem.querySelector('.ribbon__inner');

    addItem.addEventListener("click", event => {
      
     
      event.target.dispatchEvent(new CustomEvent("ribbon-select", {detail: event.target.dataset.id, bubbles: true}));
    });

    addItem.addEventListener("ribbon-select", event => {
      event.preventDefault();
      const ribbonItem = this.elem.querySelectorAll('.ribbon__item');
      ribbonItem.forEach(item => item.classList.remove('ribbon__item_active'));
      event.target.classList.add('ribbon__item_active');    
      alert(event.detail);
      return event.detail;
    });
  }

}
