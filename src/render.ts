const renderElement = ({ tagName, attrs, children, element }) => {
  const $el = element;

  // set attributes
  for (const [attr, val] of Object.entries(attrs || {})) {
    switch (attr) {
      case "click":
      case "keyup":
        $el.addEventListener(attr, val);
        break;

      default:
        if (customElements.get(tagName)) {
          $el.props[attr] = val;
        } else {
          $el.setAttribute(attr, val);
        }
        break;
    }
  }

  // set children
  for (const child of children || []) {
    // recursively render children element
    // this actually create children elements & append them to parent node

    const $child = render(child);

    if ($child) {
      if (customElements.get(tagName)) {
        // $el.shadowRoot.appendChild($child);
      } else {
        $el.appendChild($child);
      }
    }
  }

  return $el;
};

export const render = (vNode) => {
  if (vNode === undefined) {
    return null;
  }

  if (Array.isArray(vNode)) {
    return renderElement({
      tagName: "span",
      attrs: {},
      children: vNode,
      element: document.createElement("span"),
    });
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode.toString());
  }

  return renderElement(vNode);
};
