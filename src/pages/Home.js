import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { HOME_ACTION } from '../state/home.actions';
import { Incident } from '../components/Incident';
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
      <Incident
        key={i}
        title={incident.title}
        assignee={incident.assignee}
        status={incident.status}
      />
    ));
    const loadingCmp = <CircularProgress style={{ marginTop: 20 }} />;

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
