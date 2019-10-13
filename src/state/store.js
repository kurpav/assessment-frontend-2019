import { Store } from '../lib/store';
import { effect as homeEffect } from './home.effect';
import { effect as incidentEffect } from './incident.effect';
import { reducer } from './home.reducer';

const store = new Store();

store.registerReducer('home', reducer);
store.registerEffect(incidentEffect);
store.registerEffect(homeEffect);

export { store };
