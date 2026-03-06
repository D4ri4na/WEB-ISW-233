import { Router } from "./services/router.js";

globalThis.app = {};
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
});
