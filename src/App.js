import { Route, BrowserRouter as Router } from 'react-router-dom';

import { CreateIncident } from './pages/CreateIncident';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={CreateIncident} />
        </div>
      </div>
    </Router>
  );
}

export default App;
