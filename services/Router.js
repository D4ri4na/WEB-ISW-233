import Storage from "./Storaje.js";

// PATRÓN STRATEGY / FACTORY: Un diccionario de rutas
const routes = {
  "/": () => {
    const div = document.createElement("div");
    div.style.height = "500px";
    return div;
  },
  "/products": () => document.createElement("menu-page"),
  "/restaurants": () => document.createElement("restaurants-page"),
  "/order": () => document.createElement("order-page")
};

const Router = {
  init: () => {
    // 🔥 LA SOLUCIÓN DEFINITIVA: Event Delegation
    // Escuchamos los clics en todo el cuerpo del documento
    document.body.addEventListener("click", (event) => {
      // Verifica si el elemento clickeado es un <a> o está dentro de un <a>
      const link = event.target.closest("a");
      
      // Si es un enlace y su href empieza con "/" (es un enlace interno de nuestra app)
      if (link && link.getAttribute("href") && link.getAttribute("href").startsWith("/")) {
        // DETIENE la petición al servidor (evita el "Cannot GET")
        event.preventDefault(); 
        const href = link.getAttribute("href");
        Router.go(href);
      }
    });
    
    // Escucha el botón de "Atrás" o "Adelante" del navegador
    window.addEventListener("popstate", (event) => {
      Router.go(event.state ? event.state.route : location.pathname, false);
    });
    
    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    
    // Guardar la ruta actual en localStorage
    Storage.saveRoute(route);
    
    let pageElement = null;

    if (routes[route]) {
      pageElement = routes[route]();
    } else if (route.startsWith("/products/")) {
      pageElement = document.createElement("h2");
      const paramId = route.substring(route.lastIndexOf("/") + 1);
      pageElement.textContent = "Detalle del producto: " + String(paramId);
      pageElement.dataset.productId = paramId;
      pageElement.style.textAlign = "center";
      pageElement.style.marginTop = "50px";
    } else {
      pageElement = document.createElement("h1");
      pageElement.textContent = "404 - Página no encontrada ❌";
      pageElement.style.textAlign = "center";
      pageElement.style.marginTop = "50px";
    }

    if (pageElement) {
      let currentPage = document.querySelector("main").firstElementChild;
      if (currentPage) {
        currentPage.remove();
      }
      document.querySelector("main").appendChild(pageElement);
    }

    window.scrollY = 0;
    window.scrollX = 0;
  },
};

export default Router;