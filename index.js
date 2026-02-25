const container = document.getElementById("container");

/**
 * @param {string} title
 * @param {string} body
 *
 * @return {HTMLElement}
 */
function createCardComponent(title, body) {
  // @todo - Implement function
  const template = document.getElementById("card-template");
  const element = template.content.cloneNode(true).firstElementChild;
  const title_ = element.querySelector(".card__title");
  const body_ = element.querySelector(".card__body__content");

  title_.textContent = title;
  body_.textContent = body;
  return element;
}

const component = createCardComponent(
  "Frontend System Design: Fundamentals",
  "This is a random body text",
);

container.appendChild(component);
