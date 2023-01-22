import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">   
    </div>
  </div>
    `);

    let productGridInner = this.elem.querySelector('.products-grid__inner');
    for (let product of this.products) {
      let newCard = new ProductCard(product);
      productGridInner.append(newCard.elem);      
    }        
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    
    let productGridInner = this.elem.querySelector('.products-grid__inner');
    productGridInner.innerHTML = '';

    if (this.filters.noNuts) {
      this.products = this.products.filter(product => !product.nuts == this.filters.noNuts);
    }

    if (this.filters.vegeterianOnly) {
      this.products = this.products.filter(product => product.vegeterian == this.filters.vegeterianOnly);
    }

    if (this.filters.maxSpiciness) {
      this.products = this.products.filter(product => product.spiciness <= this.filters.maxSpiciness);
    }

    if (this.filters.category) {
      this.products = this.products.filter(product => product.category === this.filters.category);
    }

    for (let i of this.products) {
      let newCard = new ProductCard(i);
      productGridInner.append(newCard.elem);      
    }    
  }
}