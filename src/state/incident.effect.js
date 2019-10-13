import { INCIDENT_ACTION } from './incident.actions';

export function effect(store, { type, payload }) {
  if (type === INCIDENT_ACTION.CREATE) {
    const incident = { ...payload, status: 'Created' };
    let incidents;
    try {
      incidents = JSON.parse(localStorage.getItem('incidents')) || [];
    } catch (err) {
      incidents = [];
    }
    
    incidents.push(incident);
    localStorage.setItem('incidents', JSON.stringify(incidents));

    setTimeout(_ => {
      store.dispatch({
        type: INCIDENT_ACTION.CREATE_SUCCESS,
        payload: incident
      });
    }, 3000);
  }
}
