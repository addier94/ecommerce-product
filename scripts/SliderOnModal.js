export class SliderOnModal {
  constructor(data) {
    this.slider = data;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    document
      .getElementById("close-image-modal")
      .addEventListener("click", () => this.closeImageModal());

    document
      .getElementById("btn-prev-slider-modal")
      .addEventListener("click", () => this.changeSlider(-1));

    document
      .getElementById("btn-next-slider-modal")
      .addEventListener("click", () => this.changeSlider(1));
  }

  getCurrentThumbnail() {
    return this.slider.thumbnails.find((img) => img.selected);
  }

  render() {
    this.renderScreenHtml();
    this.renderThumbnails();
  }

  renderScreenHtml() {
    const selectedImage = this.getCurrentThumbnail();
    if (selectedImage) {
      const mainImageSrc = selectedImage.src.replace(
        /-thumbnail(?=\.\w+$)/,
        ""
      );
      document.getElementById("image-modal-screen").src = mainImageSrc;
    }
  }

  renderThumbnails() {
    const thumbnailsContainer = document.getElementById("nav-thumbnails");
    thumbnailsContainer.innerHTML = ""; // Clear existing thumbnails

    this.slider.thumbnails.forEach((item) => {
      const thumbnailElement = this.createThumbnailElement(item);
      thumbnailsContainer.appendChild(thumbnailElement);
    });
  }

  createThumbnailElement(item) {
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.alt = `thumbnail image ${item.id}`;
    img.src = item.src;
    img.className = "rounded-lg cursor-pointer w-[88px] h-[88px]";

    img.addEventListener("click", () => this.changeThumbnail(item.id));

    if (item.selected) {
      div.classList.add("active-link");
      img.classList.add("active-image");
      img.id = `imageonmodal-${item.id}`;
    }

    div.appendChild(img);
    return div;
  }

  changeThumbnail(id) {
    this.slider.thumbnails.forEach((thumbnail) => {
      thumbnail.selected = thumbnail.id === id;
    });

    this.render();
  }

  changeSlider(direction) {
    let currentIndex = this.slider.thumbnails.findIndex((img) => img.selected);
    currentIndex =
      (currentIndex + direction + this.slider.thumbnails.length) %
      this.slider.thumbnails.length;

    this.slider.thumbnails.forEach((thumbnail, index) => {
      thumbnail.selected = index === currentIndex;
    });

    this.render();
  }

  closeImageModal() {
    document.getElementById("open-image-modal").classList.remove("active");
  }

  updateSlider(data) {
    this.slider = data;
    this.render();
  }
}
