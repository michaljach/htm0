import { Component } from "../../f";
import Button from "../components/button";
import { data } from "../../f/decorators";
import { userData } from "../data/UserData";

@data(userData, "user")
export default class HomePage extends Component {
  render() {
    return (
      <div class="home">
        {this.user.userName}
        Home <Button />
      </div>
    );
  }
}
