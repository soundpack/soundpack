import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/react-hooks";
import './styles/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import client from './graphql/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
