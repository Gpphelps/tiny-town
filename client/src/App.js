import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header'

import Login from './pages/Login'
import Editor from './pages/Editor'
import Home from './pages/Home'
import CreateAccount from './pages/CreateAccount'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
            <div>
              <Header />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/createaccount">
                <CreateAccount />
              </Route>
              <Route exact path="/editor">
                <Editor />
              </Route>

            </div>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
