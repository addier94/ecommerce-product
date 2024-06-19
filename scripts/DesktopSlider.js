const slider = {
  src: "./images/image-product-1.jpg",
  thumbnails: [
    {
      id: 1,
      src: "./images/image-product-1-thumbnail.jpg",
      selected: true,
    },
    {
      id: 2,
      src: "./images/image-product-2-thumbnail.jpg",
      selected: false,
    },
    {
      id: 3,
      src: "./images/image-product-3-thumbnail.jpg",
      selected: false,
    },
    {
      id: 4,
      src: "./images/image-product-4-thumbnail.jpg",
      selected: false,
    },
  ],
};

export class DesktopSlider {
  constructor() {
    this.data = slider;
    this.cacheDom();
    this.renderSlider();
    this.eventHandler();
  }

  cacheDom() {
    this.sliderContainer = document.getElementById("d-slider-container");
    this.thumbnailsContainer = document.getElementById("thumbnails-container");
  }

  eventHandler() {
    this.data.thumbnails.forEach((item) => {
      const elem = document.getElementById(`link-slider-${item.id}`);
      if (elem) {
        elem.addEventListener("click", () => this.chooseImage(item.id));
      }
    });
  }

  chooseImage(id) {
    this.updateSelectedThumbnail(id);
    this.updateMainImage(id);
    this.renderSlider();
    this.eventHandler(); // Re-attach event handlers after re-rendering
  }

  updateSelectedThumbnail(id) {
    this.data.thumbnails = this.data.thumbnails.map((item) => ({
      ...item,
      selected: item.id === id,
    }));
  }

  updateMainImage(id) {
    const selectedItem = this.data.thumbnails.find((item) => item.id === id);
    this.data.src = selectedItem.src.replace("-thumbnail", "");
  }

  renderSlider() {
    this.renderThumbnails();
    this.renderMainImage();
  }

  renderThumbnails() {
    const thumbnails = this.data.thumbnails
      .map((item) => this.thumbnailHTML(item))
      .join("");

    this.thumbnailsContainer.innerHTML = thumbnails;
  }

  renderMainImage() {
    this.sliderContainer.innerHTML = this.sliderHTML(this.data.src);
  }

  thumbnailHTML(item) {
    return `
            <div class='${item.selected && "active-link"}'>
              <img
                class="rounded-lg cursor-pointer w-[88px] ${
                  item.selected && "active-image"
                }"
                src="${item.src}"
                alt="image"
                id="link-slider-${item.id}"
              />
            </div>
    `;
  }

  sliderHTML(src) {
    return `
        <img
          class="rounded-lg cursor-pointer"
          src="${src}"
          alt="image"
        />
    `;
  }

  // Gallery on modal image
  openImageModal() {
    document.getElementById("open-image-modal").classList.add("active");
    return this.data;
  }
}
