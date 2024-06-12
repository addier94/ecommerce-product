export class Cart {
  constructor() {
    this.isCartVisible = false;
    this.cacheDom();
    this.addEventListeners();
    this.renderCartItems(this.getCartDataFromStorage());
  }

  cacheDom() {
    this.cartContainer = document.getElementById("cart-container");
    this.cartIcon = document.getElementById("cart-icon");
    this.cartContent = document.getElementById("cart-content");

    this.emptyCartMessage = document.getElementById("empty-cart-message");
    this.badgeContainer = document.getElementById("badge-cart");
  }

  getCartDataFromStorage() {
    let localData = localStorage.getItem("singleCart");
    return localData ? JSON.parse(localData) : [];
  }

  static updateBadge(cartItems, badgeContainer) {
    if (cartItems && cartItems.length > 0) {
      badgeContainer.style.display = "block";
      badgeContainer.textContent = cartItems.length;
    } else {
      badgeContainer.style.display = "none";
    }
  }

  addEventListeners() {
    this.cartIcon.addEventListener("click", () => this.toggleCartVisibility());
    this.cartContainer.addEventListener("click", (event) =>
      this.handleCartContentClick(event)
    );
  }

  toggleCartVisibility() {
    this.isCartVisible = !this.isCartVisible;
    this.cartContainer.classList.toggle("active", this.isCartVisible);
    this.updateCartContentDisplay();
  }

  updateCartContentDisplay() {
    const isEmpty = this.isCartEmpty();
    this.cartContent.style.display = isEmpty ? "none" : "block";
    this.emptyCartMessage.style.display = isEmpty ? "block" : "none";
  }

  addItem(data) {
    this.renderCartItems([data]);
    localStorage.setItem("singleCart", JSON.stringify([data]));
  }

  isCartEmpty() {
    const cartData = this.getCartDataFromStorage();
    return cartData.length === 0;
  }

  renderCartItems(items) {
    if (items.length > 0) {
      this.cartContent.innerHTML = items.map((item) =>
        this.createCartItemHTML(item)
      );
      this.cartContent.innerHTML += this.createCheckoutButtonHTML();
    } else {
      this.updateCartContentDisplay();
    }
    Cart.updateBadge(items, this.badgeContainer);
  }

  createCartItemHTML(item) {
    return `
          <section class="flex justify-between items-center gap-4">
            <img
              class="w-12 rounded-md flex-grow"
              src="images/image-product-1-thumbnail.jpg"
              alt="Product image"
            />
            <div class="flex-grow">
              <p>${item.title}</p>
              <p>
                ${item.price} x ${item.quantity}
                <span class="text-neutral-veryDarkBlue font-bold"
                  >${item.riseOriginalPrice}</span
                >
              </p>
            </div>
            <figure class="flex-grow">
              <img
                class="cursor-pointer"
                src="images/icon-delete.svg"
                alt="Delete Icon"
                id="item-in-cart-${item.id}"
              />
            </figure>
          </section>
    `;
  }

  createCheckoutButtonHTML() {
    return `
          <button class="mt-6 h-[56px] bg-primary-orange w-full rounded-lg text-neutral-veryDarkBlue font-bold">Checkout</button>

    `;
  }

  handleCartContentClick(event) {
    if (event.target && event.target.matches('img[id^="item-in-cart-"]')) {
      const id = event.target.id;
      this.removeCartItem(id);
    }
  }

  removeCartItem(id) {
    const cartData = this.getCartDataFromStorage();
    const productId = Number(id.split("-").pop());
    const updatedCartData = cartData.filter((item) => item.id !== productId);

    localStorage.setItem("singleCart", JSON.stringify(updatedCartData));
    this.renderCartItems(updatedCartData);
  }
}
