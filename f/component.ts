import { diff } from "./diff";
import { render } from "./render";

type Props = {
  children?: string | Element;
  [key: string]: any;
};

export class Component<P extends Props = {}> extends HTMLElement {
  props = {} as P & Props;
  state = {};

  __prevTree;

  connectedCallback() {
    // Create a shadow root
    this.attachShadow({ mode: "open" });

    // Create virtual-dom tree
    this.__prevTree = this.render();

    // Create real-dom tree
    const html = render(this.__prevTree);
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
    if (this.__prevTree) {
      const newTree = this.render();
      const patch = diff(this.__prevTree, newTree);
      patch(this.shadowRoot.firstElementChild);
      this.__prevTree = newTree;
    }
  }

  render(): Element {
    throw `render() in ${this.constructor.name} not implemented.`;
  }
}
