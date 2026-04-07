import Router from "./services/Router.js";
import Store from "./services/Store.js";
import { loadData } from "./services/Menu.js";

// Importamos nuestros Web Components para que el navegador los registre
import { MenuPage } from "./blocks/menuPage/menuPage.js";
import { OrderPage } from "./blocks/orderPage/orderPage.js";
import { RestaurantsPage } from "./blocks/restaurantsPage/restaurantsPage.js";
import ProductItem from "./blocks/productItem/productItem.js";

// Importamos los servicios de almacenamiento y carrito que creamos previamente
import Storage from "./services/Storaje.js";
import { undoCart } from "./services/Order.js";

// Hacemos la app global para poder acceder a ella desde cualquier lugar
globalThis.app = {};

app.store = Store;
app.router = Router;

// Esperamos a que el DOM esté listo antes de arrancar la aplicación
window.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargamos los datos del menú (products.json)
  // 🔥 IMPORTANTE: Esperamos a que se carguen los datos ANTES de continuar
  await loadData();
  
  // 2. Cargamos el carrito desde el localStorage si había datos previos
  app.store.cart = Storage.loadCart(); 
  
  // 3. Inicializamos nuestro Router (que ahora usa Event Delegation)
  app.router.init();
  
  // 4. Navegamos a la ruta guardada (o la ruta actual si es nueva)
  const savedRoute = Storage.loadRoute();
  const currentRoute = location.pathname;
  
  // Si la ruta actual es la raíz pero hay una ruta guardada diferente, navegar a la guardada
  if(currentRoute === "/" && savedRoute !== "/") {
    app.router.go(savedRoute, false);
  }
});

// Este evento "appcartchange" se dispara automáticamente gracias a nuestro Proxy en Store.js
window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  
  // Calculamos la cantidad total de productos en el carrito
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
  
  // Guardamos el carrito en Storage automáticamente cada vez que cambia
  Storage.saveCart(app.store.cart); 
});

// Atajo de teclado global: Escuchamos presiones de teclas en toda la página
window.addEventListener("keydown", (event) => {
  // Si presiona Ctrl + Z (Patrón Command - Deshacer acción)
  if (event.ctrlKey && event.key === "z") {
    undoCart();
  }
});