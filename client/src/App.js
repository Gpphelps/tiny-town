import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header'

import Login from './pages/Login'
import Editor from './pages/Editor'
import Home from './pages/Home'
import CreateAccount from './pages/CreateAccount'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
