class Users {
  props = {
    data: "user1",
  };

  targets = [];

  constructor() {
    this.props = new Proxy(this.props, {
      set: (obj, key, value) => {
        obj[key] = value;
        const { targets } = this;
        targets.forEach((target) => {
          target.diff();
        });
        return true;
      },
    });
  }
}

const inst = new Users();

export function data(name) {
  return (Component) => {
    const NewClass: typeof Component = class extends Component {
      constructor() {
        super();

        this[name] = inst.props;

        inst.targets.push(this);
      }
    };

    Object.defineProperty(NewClass, "name", { value: Component.name });

    return NewClass;
  };
}
