import React, { Component } from 'react';

import { INCIDENT_ACTION } from '../state/incident.actions';
import { IncidentForm } from '../components/IncidentForm';
import { Redirect } from 'react-router-dom';
import { store } from '../state/store';

export class CreateIncident extends Component {
  state = {
    toHome: false
  };

  createIncident(data) {
    store.dispatch({ type: INCIDENT_ACTION.CREATE, payload: data });
    this.setState({ toHome: true });
  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
    return <IncidentForm submitted={this.createIncident.bind(this)}></IncidentForm>;
  }
}
