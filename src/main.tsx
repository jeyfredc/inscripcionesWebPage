import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as BrowserRouter } from 'react-router-dom';

import './lib/axios';
import AppRouter from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);