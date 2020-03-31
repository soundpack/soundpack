import "./styles/index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import client from './graphql/client';
import store from './redux/store';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
