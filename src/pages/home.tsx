import { Component } from "../../f";
import Button from "../components/button";
import { data } from "../../f/decorators";

@data("user")
export default class HomePage extends Component {
  render() {
    return (
      <div class="home">
        {this.user.data}
        Home <Button />
      </div>
    );
  }
}
