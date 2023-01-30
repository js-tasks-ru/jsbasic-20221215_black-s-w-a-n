export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {    

      if (this.cartItems.includes(product)) {        
        this.cartItems.forEach(item => {
          if (item.name == product.name) {
            return item.count += 1;
          }
        });
      } else {
        product.count = 1;
        this.cartItems.push(product);
      }
      this.onProductUpdate(this.cartItem);
    }      
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach(item => {
      if (item.id == productId) {
        item.count += amount;
        if (!item.count) {
          this.cartItems = this.cartItems.filter(item => item.id != productId);
        }
      } 
    });
    
    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    if (this.cartItems.length) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

