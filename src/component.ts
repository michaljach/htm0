import { diff } from "./diff";
import { render } from "./render";

export class Component extends HTMLElement {
  styles;

  state = {};

  __v;

  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Create local style element
    if (this.styles) {
      const style = document.createElement("style");
      style.innerHTML = this.styles;
      this.shadowRoot.appendChild(style);
    }

    // Create virtual-dom tree
    this.__v = this.render();

    // Create real-dom tree
    const html = render(this.__v);
    this.shadowRoot.appendChild(html);

    // Observe state changes
    this.state = new Proxy(this.state, {
      set: (obj, key, value) => {
        obj[key] = value;
        this.diff();
        return true;
      },
    });
  }

  diff() {
    if (this.__v) {
      const newTree = this.render();
      const patch = diff(this.__v, newTree);
      patch(this.shadowRoot.firstElementChild);
      this.__v = newTree;
    }
  }

  render(): Element {
    throw `render() in ${this.constructor.name} not implemented.`;
  }
}
