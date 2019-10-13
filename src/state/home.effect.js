import { HOME_ACTION } from './home.actions';

export function effect(store, { type, payload }) {
  if (type === HOME_ACTION.GET_INCIDENTS) {
    // http call
    setTimeout(_ => {
      let incidents;
      try {
        incidents = JSON.parse(localStorage.getItem('incidents')) || [];
      } catch (err) {
        incidents = [];
      }
      store.dispatch({
        type: HOME_ACTION.GET_INCIDENTS_SUCCESS,
        payload: incidents
      });
    }, 3000);
  }
}
