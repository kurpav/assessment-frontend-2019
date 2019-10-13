import { HOME_ACTION } from './home.actions';
import { INCIDENT_ACTION } from './incident.actions';

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
    case HOME_ACTION.GET_INCIDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        incidents: payload
      };
    case INCIDENT_ACTION.CREATE_SUCCESS:
      return {
        ...state,
        incidents: [...state.incidents, payload]
      };
    default:
      return state;
  }
}
