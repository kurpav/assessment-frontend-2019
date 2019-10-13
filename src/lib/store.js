export class Store {
  _state = {};
  _reducers = [];
  _effects = [];
  _listeners = {};

  registerReducer(name, reducer) {
    this._reducers.push({ name, reducer });
    this._state[name] = reducer();
  }

  registerEffect(effect) {
    this._effects.push(effect);
  }

  dispatch(action) {
    this._effects.forEach(e => e(this, action));
    this._reducers.forEach(({ name, reducer }) => {
      const prevState = this._state[name];
      const newState = reducer(prevState, action);
      this._state[name] = newState;

      if (prevState !== newState) {
        (this._listeners[name] || []).forEach(l => l());
      }
    });
  }

  getState(stateMapper) {
    return stateMapper(this._state);
  }

  registerChangeListener(reducerName, callback) {
    const stateListeners = this._listeners[reducerName];
    if (stateListeners) {
      stateListeners.push(callback);
    } else {
      this._listeners[reducerName] = [callback];
    }
  }

  unregisterChangeListener(reducerName, callback) {
    const stateListeners = this._listeners[reducerName];
    if (stateListeners) {
      this._listeners[reducerName] = stateListeners.filter(l => l !== callback);
    } else {
      throw Error('Can\'t find reducer with such name');
    }
  }
}
