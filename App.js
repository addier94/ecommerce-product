import { ToggleMenu } from "./scripts/ToggleMenu.js";
import { Cart } from "./scripts/Cart.js";
import { Product } from "./scripts/Product.js";
import { Slider } from "./scripts/Slider.js";
import { DesktopSlider } from "./scripts/DesktopSlider.js";
import { SliderOnModal } from "./scripts/SliderOnModal.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize toggle menu
  const toggleMenu = new ToggleMenu();
  // toggleMenu.toggle();

  // Initialize product
  const productData = {
    id: 1,
    brand: "Sneaker Company",
    title: "Fall Limited Edition Sneakers",
    description:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: 125.0,
    discount: 50,
    riseOriginalPrice: 250.0,
    originalPrice: 250.0,
  };
  const product = new Product(productData);
  product.renderProduct();

  // Initialize cart
  const cart = new Cart();

  // Event listeners for product quantity
  document
    .getElementById("quantity-increase")
    .addEventListener("click", () => product.increaseQuantity());
  document
    .getElementById("quantity-decrease")
    .addEventListener("click", () => product.decreaseQuantity());

  // Add to cart functionality
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    cart.addItem({
      ...productData,
      quantity: product.productQuantity,
    });
  });

  // Initialize sliders
  const slider = new Slider();
  // slider.init();
  const desktopSlider = new DesktopSlider();
  // desktopSlider.init();

  // Open Modal
  const dSliderContainer = document.getElementById("d-slider-container");
  dSliderContainer.addEventListener("click", openImageModal);

  let sliderOnModalInstance = null;

  function openImageModal() {
    const data = desktopSlider.openImageModal();

    if (!sliderOnModalInstance) {
      sliderOnModalInstance = new SliderOnModal(data);
    } else {
      sliderOnModalInstance.updateSlider(data);
      sliderOnModalInstance.render();
    }
  }
});
