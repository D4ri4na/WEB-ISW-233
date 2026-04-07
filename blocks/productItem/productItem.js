import { addToCart } from "../../services/Order.js";

export default class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("product-card-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    // 🔥 Parse del producto desde dataset
    let product;
    try {
      product = JSON.parse(this.dataset.product);
    } catch (error) {
      console.error("Error parseando producto:", error, this.dataset.product);
      return;
    }
    
    // Rellenar datos del producto
    const titleEl = this.querySelector("h3");
    const imgEl = this.querySelector("img");
    const descEl = this.querySelector("p.product-card__description");
    const priceEl = this.querySelector("p.product-card__price");
    
    if (titleEl) titleEl.textContent = product.title;
    if (imgEl) {
      imgEl.src = product.imageUrl;
      imgEl.alt = product.altText || "Producto";
    }
    if (descEl) descEl.textContent = product.description;
    if (priceEl) priceEl.textContent = product.price;

    const cardEl = this.querySelector(".product-card");
    if (cardEl) {
      cardEl.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() == "button") {
          addToCart(product.id);
        } else {
          app.router.go(`/products/${product.id}`);
        }
        event.preventDefault();
      });
    }
  }
}

customElements.define("product-item", ProductItem);