import { Component } from "./component";

export class RouterComponent extends Component {
  currentRoute = this.getLocation();

  constructor() {
    super();

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        this.currentRoute = argArray[2].replace("#", "/");
        this.diff();
        return target.apply(thisArg, argArray);
      },
    });

    window.addEventListener("popstate", () => {
      this.currentRoute = this.getLocation();
      this.diff();
    });
  }

  getLocation() {
    return `/${window.location.hash.slice(1)}` || "/";
  }

  render() {
    return <div>{this.props.routes[this.currentRoute]}</div>;
  }
}
