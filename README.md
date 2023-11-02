# Framework needs name

- super simple
- super small (2 KB)
- super fast (~47 FCP)
- jsx support
- vitual dom
- shared state
- local state

## Install

```
npx framework ./
```

## Example Component

```
import { Component } from 'framework';

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
import { Component } from 'framework';

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
import { Component, data } from 'framework';
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
