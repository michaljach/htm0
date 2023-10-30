class Users {
  props = {
    data: ["user1", "user2"],
  };

  targets = [];

  constructor() {
    this.props = new Proxy(this.props, {
      set: (obj, key, value) => {
        obj[key] = value;
        const { targets } = this;
        targets.forEach((target) => {
          target.props.inject = value;
        });
        return true;
      },
    });
  }
}

const inst = new Users();
window.i = inst;

export function props(name) {
  return (x, y) => {
    inst.targets.push(x);

    x.props = new Proxy(
      { inject: inst.props.data },
      {
        set: (obj, key, value) => {
          obj[key] = value;
          x.diff.call(x);
          return true;
        },
      }
    );

    // x.props = { inject: inst.props.data };
    return x;
  };
}
