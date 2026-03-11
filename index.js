import { createCardElement, getHeading } from "./services/utlis.js";
import { initMockDB } from "./services/db.js";

const SUPPORTED_ELEMENTS = new Set(["/h1", "/h2", "/h3"]);

const db = initMockDB({
  title: "Fundamentals of Frontend System Design",
  body: "Learning to use Intersection Observer",
});
const list = document.getElementById("list");
const observerElement = document.getElementById("bottom-observer");

const mutationObserver = new MutationObserver((mutations) => {
  for (const { target, type } of mutations) {
    if (type === "characterData" && SUPPORTED_ELEMENTS.has(target?.textContent)) {
      const element = getHeading(target);
      target.replaceWith(element);
      element.focus();
    }
  }
});

let page = 0;
const observer = new IntersectionObserver(
  async ([bottom]) => {
    if (bottom.isIntersecting) {
      observerElement.textContent = "Loading";
      const data = await db.getPage(page++);
      const fragment = new DocumentFragment();
      data.forEach(({ title, body }) => {
        const card = createCardElement(title, body);
        fragment.appendChild(card);
        const content = card.querySelector(".card__body__content");
        mutationObserver.observe(content, { characterData: true, subtree: true });
      });

      list.appendChild(fragment);
    }
  },
  { threshold: 0.1 },
);
observer.observe(observerElement);
