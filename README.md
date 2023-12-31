# htm0

Fast and elegant Web Components framwork

- super simple
- 0 dependency
- super small (2 KB)
- super fast (~47ms FCP)
- native web components
- jsx support
- vitual dom
- shared state
- local state
- events

## Install

```
npm i htm0
```

## Example Component

```
import { Component } from 'htm0';

class AppComponent extends Component {
  render() {
    return (
      <div class="app">
        Hello World !
      </div>
    );
  }
}
```

## Example Stateful Component

```
import { Component } from 'htm0';

class AppComponent extends Component {
    state = {
        username: 'Michael'
    }

  render() {
    return (
      <div class="app">
        {this.state.username}
      </div>
    );
  }
}
```

## Example Shared State

```
import { Component, data } from 'htm0';
import { userData } from './userData'

@data(userData, 'user')
class AppComponent extends Component {
  render() {
    return (
      <div class="app">
        {this.user.username}
      </div>
    );
  }
}
```

```
import { Data } from "framework";

class UserData extends Data {
  data = {
    username: "Michael",
  };
}

export const userData = new UserData();
```

## Example Event

```
import { Component } from 'htm0';

class AppComponent extends Component {
  click() {
    console.log('hi');
  }

  render() {
    return (
      <button click={this.click}>click me</button>
    );
  }
}
```
