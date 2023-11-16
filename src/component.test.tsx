import { getByText } from "@testing-library/dom";
import { Component } from "./component";
import { render } from "./utils";

class BasicComponent extends Component {
  state = {
    message: "Hello World",
  };

  render() {
    return <div data-testid="message">{this.state.message}</div>;
  }
}

describe("example component", () => {
  let renderFn;
  let container;
  let component;

  beforeAll(() => {
    renderFn = BasicComponent.prototype.render = jest
      .fn()
      .mockImplementation(BasicComponent.prototype.render);

    const rendered = render(BasicComponent, document.body);
    container = rendered.container;
    component = rendered.component;
  });

  test("basic render", () => {
    expect(renderFn).toHaveBeenCalledTimes(1);
    expect(getByText(container, "Hello World")).toBeDefined();
  });

  test("updates local state", () => {
    expect(renderFn).toHaveBeenCalledTimes(1);
    component.state.message = "Update!";
    expect(renderFn).toHaveBeenCalledTimes(2);
    expect(getByText(container, "Update!")).toBeDefined();
  });
});
