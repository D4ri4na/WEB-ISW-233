// import Handlebars from "handlebars";
// import chatItemTemplate from "./components/chat-item/chat-item.hbs?raw";
// import sidebarTemplate from "./layouts/sidebar/sidebar.hbs?raw";

// Handlebars.registerPartial("chat-item", chatItemTemplate);

// const entryNode = document.body;
// const compiledTemplate = Handlebars.compile(sidebarTemplate)();

// entryNode.innerHTML = compiledTemplate;

import Handlebars from "handlebars";
import chatItemTpl from "./components/chat-item/chat-item.hbs?raw";
import sidebarTpl from "./layouts/sidebar/sidebar.hbs?raw";
import { chats } from "./mock/chats.js";

Handlebars.registerPartial("chat-item", chatItemTpl);

document.body.innerHTML = Handlebars.compile(sidebarTpl)({ chats });
