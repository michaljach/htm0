import { Component, render } from "../f";
import Home from "./pages/home";

class AppComponent extends Component {
  render() {
    return (
      <div class="siema">
        <Home />
      </div>
    );
  }
}

render(AppComponent, document.body);
