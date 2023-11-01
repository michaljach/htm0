import { Component } from "../../f";
import { data } from "../../f/decorators";
import { userData } from "../data/UserData";

@data(userData, "user")
export default class ButtonComponent extends Component {
  state = {
    count: 0,
    array: ["1", "2"],
  };

  onClick() {
    console.log("click");
    this.state.count++;
    this.state.array = ["3", "4", "5"];
    this.user.userName = "dupsko";
  }

  render() {
    return (
      <div>
        <div>{this.user.userName}</div>
        <div>{this.state.count}</div>
        <div>
          {this.state.array.map((item) => (
            <div>{item}</div>
          ))}
        </div>
        <button click={this.onClick.bind(this)}>
          <span>click me</span>
        </button>
      </div>
    );
  }
}
