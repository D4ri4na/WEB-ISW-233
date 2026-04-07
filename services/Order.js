import { getProductById } from "./Menu.js";

const commandHistory = [];

export async function addToCart(id) {
  const product = await getProductById(id);
  
  const previousCart = JSON.parse(JSON.stringify(app.store.cart));
  commandHistory.push({
    undo: () => {
      app.store.cart = previousCart;
    }
  });

  const results = app.store.cart.filter((productInCart) => productInCart.product.id == id);
  if (results.length == 1) {
    app.store.cart = app.store.cart.map((p) =>
      p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p,
    );
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  // Aquí podrías implementar una lógica similar con commandHistory
}

export function undoCart() {
  if (commandHistory.length > 0) {
    const lastCommand = commandHistory.pop(); 
    lastCommand.undo(); 
  } else {
    console.log("No hay acciones para deshacer");
  }
}