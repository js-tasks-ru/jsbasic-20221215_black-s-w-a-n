import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {    

      if (this.cartItems.includes(product)) {        
        this.cartItems.forEach(item => {
          if (item.name == product.name) {
            item.count += 1;
            this.cartItem = item;
          }
        });
      } else {
        product.count = 1;
        this.cartItems.push(product);
        this.cartItem = product;
      }
      this.onProductUpdate(this.cartItem);
    }      
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach(item => {
      if (item.id == productId) {
        item.count += amount;
        this.cartItem = item;
        if (!item.count) {
          this.cartItems = this.cartItems.filter(item => item.id != productId);
        }
      } 
    });
    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    
    this.modal = new Modal();    
    this.modal.setTitle("Your order");
    this.container = document.createElement('div'); 
    this.cartItems.map(item => this.container.append(this.renderProduct(item, item.count)));
    this.container.append(this.renderOrderForm());

    this.container.addEventListener('click', event => {
      let cartProduct = event.target.closest("[data-product-id]");
      let plusMinusCount = event.target.closest(".cart-counter__button_plus") ? 1 : -1;
      this.updateProductCount(cartProduct.dataset.productId, plusMinusCount);    
    });

    this.container.querySelector('form').addEventListener('submit', event => {       
      this.onSubmit(event);
    });

    this.modal.setBody(this.container);
    this.modal.open();     
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.querySelector('.is-modal-open')) {
      let productId = cartItem.id;
      let productCount = document.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = document.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = document.querySelector(`.cart-buttons__info-price`);

      if (cartItem.count == 0) {
        document.querySelector(`[data-product-id="${productId}"]`).remove();
        if (this.cartItems.length == 0) {
          this.modal.close();
        }
      }

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }    
  }

  async onSubmit(event) {
    event.preventDefault();
    
    const buttonSubmit = document.querySelector('button[type="submit"]');
    buttonSubmit.classList.add('is-loading');
   
    let form = document.querySelector('.cart-form');
    await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    }).then(response => {
      if (response.ok) {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.container.innerHTML = `<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `;
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();    
  }
}

