import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header'

import Login from './pages/Login'
import Editor from './pages/Editor'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Route exact path="/">
            {/* <div id="canvCont"></div> */}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/editor">
            <Editor />
          </Route>

        </div>
      </Router>
    </div>
  );
}

export default App;
