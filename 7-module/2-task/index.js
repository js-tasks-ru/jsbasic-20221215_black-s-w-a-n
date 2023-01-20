import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem;
  title;
  node;
  constructor() {
        
  }

  open() {
    this.elem = createElement(`
      <div class="modal">     
        <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
              <h3 class="modal__title">              
              </h3>
            </div>
          <div class="modal__body">                  
          </div>
        </div>
      </div>
    `);

    this.elem.querySelector('.modal__title').textContent = this.title;
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(this.node);
    document.body.before(this.elem);
    document.body.classList.add('is-modal-open');
    this.closeButton();
    this.closeKey();
  }

  setTitle(title) {    
    return this.title = title;
  }

  setBody(node) {  
    return this.node = node;
  }  

  closeButton() {  
    const modClose = document.querySelector('.modal__close');
    modClose.addEventListener('click', () => {
      document.body.classList.remove('is-modal-open');
      document.querySelector('.modal').remove();
    });
  }

  closeKey() {    
    function handler (event) {
      if (event.code == 'Escape') {      
        document.body.classList.remove('is-modal-open');
        document.querySelector('.modal').remove();
      }
      document.removeEventListener('keydown', handler);
    }

    document.addEventListener('keydown', handler);
   
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.querySelector('.modal').remove();
  }
}
