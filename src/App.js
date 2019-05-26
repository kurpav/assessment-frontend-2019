import React                              from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CreateIncident }                 from './pages/CreateIncident'
import { Home }                           from './pages/Home'
import { Header }                         from './components/Header'

function App () {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div>
          <Route exact path="/" component={ Home }/>
          <Route path="/create" component={ CreateIncident }/>
        </div>
      </div>
    </Router>
  )
}

export default App
