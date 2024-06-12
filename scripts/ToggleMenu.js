export class ToggleMenu {
  constructor() {
    this.bar = document.getElementById("bar");
    this.close = document.getElementById("close");
    this.mobileMenu = document.getElementById("mobile-menu");

    this.isMenuOpen = false;
    this.addEventListeners();
  }

  addEventListeners() {
    this.bar.addEventListener("click", () => this.toggle());
    this.close.addEventListener("click", () => this.toggle());
  }

  toggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.mobileMenu.classList.remove("active");
    } else {
      this.mobileMenu.classList.add("active");
    }
  }
}
