import { createCardElement, getHeading } from "./services/utlis.js";
import { initMockDB } from "./services/db.js";

const SUPPORTED_ELEMENTS = new Set(["/h1", "/h2", "/h3"]);

const db = initMockDB({
  title: "Fundamentals of Frontend System Design",
  body: "Learning to use Intersection Observer",
});
const list = document.getElementById("list");
const observerElement = document.getElementById("bottom-observer");
