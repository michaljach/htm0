export class Data {
  data = {};

  targets = [];

  isObserving = false;

  observe() {
    this.data = new Proxy(this.data, {
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

export function data(dataInstance: Data, propName?: string) {
  return (Component) => {
    const NewClass: typeof Component = class extends Component {
      constructor() {
        super();

        this[propName || dataInstance.constructor.name] = dataInstance.data;

        dataInstance.targets.push(this);

        if (!dataInstance.isObserving) {
          dataInstance.observe();
          dataInstance.isObserving = true;
        }
      }
    };

    Object.defineProperty(NewClass, "name", { value: Component.name });

    return NewClass;
  };
}
