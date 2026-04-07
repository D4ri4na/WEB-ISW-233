import { removeFromCart } from "../../services/Order.js";

export class OrderPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      try {
        let request = await fetch("/blocks/orderPage/orderPage.css");
        if (!request.ok) {
          request = await fetch("./blocks/orderPage/orderPage.css");
        }
        const css = await request.text();
        styles.textContent = css;
      } catch (error) {
        console.error("Error cargando el CSS:", error);
      }
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("order-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Event listener para el botón de continuar comprando
    const continueBtn = this.root.querySelector("#continue-shopping");
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        app.router.go("/products");
      });
    }

    // Event listener para el botón de checkout
    const checkoutBtn = this.root.querySelector("#checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (app.store.cart.length > 0) {
          alert("¡Gracias por tu pedido! 🎉\n\nTu pedido ha sido confirmado y será entregado pronto.");
          // Vaciar carrito
          app.store.cart = [];
          app.router.go("/products");
        }
      });
    }

    window.addEventListener("appcartchange", () => {
      this.render();
    });
    
    this.render();
  }

  render() {
    const cartContainer = this.root.querySelector("#cart-items");
    const totalContainer = this.root.querySelector("#order-total");
    const emptyContainer = this.root.querySelector("#empty-cart");
    const checkoutBtn = this.root.querySelector("#checkout-btn");
    
    if (!cartContainer || !totalContainer || !emptyContainer) return;

    if (app.store.cart && app.store.cart.length > 0) {
      emptyContainer.style.display = "none";
      checkoutBtn.style.display = "block";
      
      cartContainer.innerHTML = "";
      let total = 0;

      for (let item of app.store.cart) {
        const product = item.product;
        const price = parseFloat(product.price.replace('$', ''));
        const itemTotal = price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <div class="cart-item__image">
            <img src="${product.imageUrl}" alt="${product.title}" />
          </div>
          <div class="cart-item__info">
            <h3 class="cart-item__title">${product.title}</h3>
            <p class="cart-item__price">${product.price}</p>
          </div>
          <div class="cart-item__quantity">
            <span>Cantidad: <strong>${item.quantity}</strong></span>
          </div>
          <div class="cart-item__total">
            <span>$${itemTotal.toFixed(2)}</span>
          </div>
          <button class="cart-item__remove" data-product-id="${product.id}">
            ✕ Eliminar
          </button>
        `;

        cartItem.querySelector(".cart-item__remove").addEventListener("click", (e) => {
          e.preventDefault();
          const id = parseInt(e.target.dataset.productId);
          
          // Remover producto del carrito
          app.store.cart = app.store.cart.filter(p => p.product.id !== id);
        });

        cartContainer.appendChild(cartItem);
      }

      totalContainer.innerHTML = `
        <div class="order-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Envío:</span>
            <span>$2.99</span>
          </div>
          <div class="summary-row summary-total">
            <span>Total:</span>
            <span>$${(total + 2.99).toFixed(2)}</span>
          </div>
        </div>
      `;
    } else {
      emptyContainer.style.display = "block";
      checkoutBtn.style.display = "none";
      cartContainer.innerHTML = "";
      totalContainer.innerHTML = "";
    }
  }
}

customElements.define("order-page", OrderPage);
