export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    // 🔥 CORRECCIÓN: Usamos ruta relativa desde raíz
    async function loadCSS() {
      try {
        // Intentamos cargar desde diferentes rutas
        let request = await fetch("/blocks/menuPage/menuPage.css");
        if (!request.ok) {
          request = await fetch("./blocks/menuPage/menuPage.css");
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
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    
    // 🔥 Renderizar inmediatamente si ya hay datos
    this.render();
  }

  render() {
    const menuContainer = this.root.querySelector("#menu");
    if (!menuContainer) return;

    if (app.store.menu && app.store.menu.length > 0) {
      menuContainer.innerHTML = "";
      for (let product of app.store.menu) {
        const item = document.createElement("product-item");
        item.dataset.product = JSON.stringify(product);
        menuContainer.appendChild(item);
      }
    } else if (app.store.menu) {
      // Si es un array pero está vacío
      menuContainer.innerHTML = "<h2>No hay productos disponibles 😞</h2>";
    } else {
      // Si aún no se han cargado los datos
      menuContainer.innerHTML = "<h2>Cargando productos... ⏳</h2>";
    }
  }
}

customElements.define("menu-page", MenuPage);