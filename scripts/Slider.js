export class Slider {
  constructor() {
    this.images = [
      "images/image-product-1.jpg",
      "images/image-product-2.jpg",
      "images/image-product-3.jpg",
      "images/image-product-4.jpg",
    ];
    this.container = document.getElementById("imagesContent");
    this.prevBtn = document.getElementById("btnPrev");
    this.nextBtn = document.getElementById("btnNext");

    this.currentSlide = 0;

    this.initSlider();
  }

  initSlider() {
    this.renderImages();
    this.addEventListeners();
    this.updateSlidePosition();
  }

  renderImages() {
    const imagesHTML = this.images
      .map((image, index) => {
        return this.createImageHTML(image, index);
      })
      .join("");

    this.container.innerHTML = imagesHTML;
  }

  createImageHTML(image, i) {
    return `
      <div class="w-screen" id="image-wrapper-${i}">
          <img
            class="h-full w-full object-cover"
            src="${image}"
            alt="Product ${i + 1}"
          />
      </div>
    `;
  }

  addEventListeners() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.images.length) % this.images.length;
    this.updateSlidePosition();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    this.container.style.left = `-${this.currentSlide * 100}%`;
  }
}
