export const getComponentName = (component) =>
  component.name[0].toLowerCase() +
  component.name
    .slice(1, component.name.length)
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const render = (component, target) => {
  const name = getComponentName(component);
  customElements.define(name, component);
  const root = document.createElement(name);
  target.appendChild(root);
};
