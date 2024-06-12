export class Product {
  constructor(productData) {
    this.productData = productData;
    this.productQuantity = 1;
  }

  renderProduct() {
    document.getElementById("product-brand").textContent =
      this.productData.brand;
    document.getElementById("product-title").textContent =
      this.productData.title;
    document.getElementById("product-description").textContent =
      this.productData.description;
    document.getElementById(
      "product-price"
    ).textContent = `$${this.productData.price.toFixed(2)}`;
    document.getElementById(
      "product-discount"
    ).textContent = `${this.productData.discount}%`;
    document.getElementById(
      "product-original-price"
    ).textContent = `$${this.productData.riseOriginalPrice.toFixed(2)}`;
    document.getElementById("product-quantity").textContent =
      this.productQuantity;
  }

  increaseQuantity() {
    this.productQuantity++;
    this.calcAmount();
  }

  decreaseQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
      this.calcAmount();
    }
  }

  calcAmount() {
    this.productData.price =
      (this.productData.originalPrice / 2) * this.productQuantity;
    this.productData.riseOriginalPrice =
      this.productData.originalPrice * this.productQuantity;

    this.renderProduct();
  }
}
