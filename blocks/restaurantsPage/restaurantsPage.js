export class RestaurantsPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      try {
        let request = await fetch("/blocks/restaurantsPage/restaurantsPage.css");
        if (!request.ok) {
          request = await fetch("./blocks/restaurantsPage/restaurantsPage.css");
        }
        const css = await request.text();
        styles.textContent = css;
      } catch (error) {
        console.error("Error cargando el CSS:", error);
      }
    }
    loadCSS();
  }

  async connectedCallback() {
    const template = document.getElementById("restaurants-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Cargar restaurantes
    await this.loadRestaurants();
    this.render();
  }

  async loadRestaurants() {
    try {
      const response = await fetch("./data/restaurants.json");
      this.restaurants = await response.json();
    } catch (error) {
      console.error("Error cargando restaurantes:", error);
      this.restaurants = [];
    }
  }

  render() {
    const restaurantsContainer = this.root.querySelector("#restaurants-list");
    if (!restaurantsContainer) return;

    if (this.restaurants && this.restaurants.length > 0) {
      restaurantsContainer.innerHTML = "";
      
      for (let restaurant of this.restaurants) {
        const restaurantCard = document.createElement("div");
        restaurantCard.className = "restaurant-card";
        restaurantCard.innerHTML = `
          <div class="restaurant-card__image">
            <img src="${restaurant.imageUrl}" alt="${restaurant.name}" />
          </div>
          <div class="restaurant-card__content">
            <h3 class="restaurant-card__name">${restaurant.name}</h3>
            <p class="restaurant-card__description">${restaurant.description}</p>
            <div class="restaurant-card__meta">
              <span class="meta-item">
                <strong>⭐ ${restaurant.rating}</strong> (${restaurant.reviews} reseñas)
              </span>
              <span class="meta-item">
                🚗 ${restaurant.deliveryTime}
              </span>
              <span class="meta-item">
                💵 ${restaurant.deliveryCost}
              </span>
            </div>
            <button class="restaurant-card__btn">Ver Menú →</button>
          </div>
        `;

        restaurantCard.querySelector(".restaurant-card__btn").addEventListener("click", () => {
          app.router.go("/products");
        });

        restaurantsContainer.appendChild(restaurantCard);
      }
    } else {
      restaurantsContainer.innerHTML = "<h2>No hay restaurantes disponibles 😞</h2>";
    }
  }
}

customElements.define("restaurants-page", RestaurantsPage);
