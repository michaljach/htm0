import { getComponentName } from "./utils";

type VTree = {
  tagName: string;
  attrs: { [key: string]: any };
  element: Element;
  children: VTree | string[];
};

export const h = (tag, attrs, ...children): VTree => {
  const isComponent = typeof tag === "function";
  const tagName = isComponent ? getComponentName(tag) : tag;
  if (isComponent && !customElements.get(tagName)) {
    customElements.define(tagName, tag);
  }

  const element = document.createElement(tagName);

  return {
    tagName,
    attrs,
    element,
    children,
  };
};
