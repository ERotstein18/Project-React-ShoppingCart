import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';


const client = new QueryClient();
ReactDOM.render (
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
