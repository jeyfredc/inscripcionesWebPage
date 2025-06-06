import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as BrowserRouter } from 'react-router-dom';

import './lib/axios';
import AppRouter from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);