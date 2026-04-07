const Storage = {
  saveCart(cart) {
    localStorage.setItem("appCart", JSON.stringify(cart));
  },
  loadCart() {
    const data = localStorage.getItem("appCart");
    return data ? JSON.parse(data) : [];
  },
  saveRoute(route) {
    localStorage.setItem("appRoute", route);
  },
  loadRoute() {
    const route = localStorage.getItem("appRoute");
    return route || "/";
  }
};

export default Storage;