import { Component } from "../../f";
import Button from "../components/button";

let nextId = 1;

const A = [
  "pretty",
  "large",
  "big",
  "small",
  "tall",
  "short",
  "long",
  "handsome",
  "plain",
  "quaint",
  "clean",
  "elegant",
  "easy",
  "angry",
  "crazy",
  "helpful",
  "mushy",
  "odd",
  "unsightly",
  "adorable",
  "important",
  "inexpensive",
  "cheap",
  "expensive",
  "fancy",
];
const C = [
  "red",
  "yellow",
  "blue",
  "green",
  "pink",
  "brown",
  "purple",
  "brown",
  "white",
  "black",
  "orange",
];
const N = [
  "table",
  "chair",
  "house",
  "bbq",
  "desk",
  "car",
  "pony",
  "cookie",
  "sandwich",
  "burger",
  "pizza",
  "mouse",
  "keyboard",
];

function random(max) {
  return Math.round(Math.random() * 1000) % max;
}

function buildData(count) {
  const data = new Array(count);
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${C[random(C.length)]} ${
        N[random(N.length)]
      }`,
    };
  }
  return data;
}

export default class HomePage extends Component {
  state = {
    test: "hmm",
    numbers: [1, 2, 3],
    data: buildData(1000),
  };

  test() {
    this.state.data = buildData(1000);
    // this.state.test = "lolada";
    // this.state.numbers = [4, 5, 6, Math.random()];
  }

  render() {
    return (
      <div class="siema">
        Home {this.state.test}
        <Button
          siema="yo"
          name={this.state.test}
          onClick={this.test.bind(this)}
        />
        {this.state.data.map((item) => (
          <div>{item.label}</div>
        ))}
      </div>
    );
  }
}
