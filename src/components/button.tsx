import { Component } from "../../f";
import { props } from "../../f/decorators";

type IButtonComponentProps = {
  name: string;
};

export default class ButtonComponent extends Component<IButtonComponentProps> {
  render() {
    return (
      <button click={this.props.onClick}>
        <span>{this.props.name}</span>
      </button>
    );
  }
}
