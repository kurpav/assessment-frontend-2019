# kurpav-redux

Simple library to help to implement redux state managment.

## Documentation

There is only one class called `Store`. What this class do:

- allows to dispatch actions
- notifies Components about changes in particular state
- provides state

### Example

```js
// store.js
import { Store } from '../lib/store';
import { effect } from './home.effect';
import { reducer } from './home.reducer';

const store = new Store();

store.registerReducer('home', reducer);
store.registerEffect(effect);

export { store };
```

```js
//home.reducer.js
import { HOME_ACTION } from './home.actions';

const initialState = {
  loading: false,
  incidents: []
};

export function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case HOME_ACTION.GET_INCIDENTS:
      return {
        ...state,
        loading: true
      };
    // ...
    default:
      return state;
  }
}
```

```js
//home.effect.js
import { HOME_ACTION } from './home.actions';

export function effect(store, { type, payload }) {
  if (type === HOME_ACTION.GET_INCIDENTS) {
    // data fetching
    setTimeout(_ => {
      store.dispatch({
        type: HOME_ACTION.GET_INCIDENTS_SUCCESS,
        payload: incidents
      });
    }, 3000);
  }
}
```

```js
// home.actions.js
export const HOME_ACTION = {
  GET_INCIDENTS: 'HOME_ACTION.GET_INCIDENTS',
  GET_INCIDENTS_SUCCESS: 'HOME_ACTION.GET_INCIDENTS_SUCCESS'
};
```

```jsx
// Home.js
import React, { Component } from 'react';

import { HOME_ACTION } from '../state/home.actions';
import { store } from '../state/store';

function getState() {
  return store.getState(state => state.home);
}

export class Home extends Component {
  state = getState();

  _onChange = this._detectChanges.bind(this);

  componentDidMount() {
    store.registerChangeListener('home', this._onChange);
    store.dispatch({ type: HOME_ACTION.GET_INCIDENTS });
  }

  componentWillUnmount() {
    store.unregisterChangeListener('home', this._onChange);
  }

  _detectChanges() {
    this.setState(getState());
  }

  render() {
    const { loading, incidents } = this.state;
    const incidentList = incidents.map((incident, i) => (
      <div key={i}>
        <div>title: {incident.title}</div>
        <div>assignee: {incident.assignee}</div>
        <div>status: {incident.status}</div>
      </div>
    ));
    const loadingCmp = <div style={{ marginTop: 20 }}>Loading...</div>;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: loading ? 'center' : 'flex-start'
        }}
      >
        {loading ? loadingCmp : incidentList}
      </div>
    );
  }
}
```

### API

##### registerReducer(name, reducer)

Registers reducer function for particular state.

- name - name for sub-state
- reducer - pure function which returns state

#### registerEffect(effect)

Registers effect function. Effects are used to react on actions and dispatch new actions. I.e. for fetching data from REST.

- effect - function to react on any actions.

#### dispatch(action)

Dispatches an action within app, so that action passes through effect and reducer functions.

- action - a simple object with two fields i.e. `{ type: 'ACTION_TYPE', payload: 'some data' }`

#### getState(stateMapper)

Returns current state of the app

- stateMapper - a function which allows to get particular state from app state

#### registerChangeListener(reducerName, callback)

Registers a listener to listen for paticular changes in the app state. Usually used in components to listen to state changes.

- reducerName - name of sub-state which you want to listen to
- callback - called when the sub-state was changed

#### unregisterChangeListener(reducerName, callback)

Unregisters a listener for paticular changes in the app state.

- reducerName - name of sub-state
- callback - callback function
