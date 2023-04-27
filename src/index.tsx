// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';

// Containers
import { App } from './containers/App';

// Style
import './static/global.css';

// React setup
const DOM_ELEMENT = document.getElementById('root');
if (!DOM_ELEMENT) throw new Error('Unable to find the dom element');
const root = ReactDOM.createRoot(DOM_ELEMENT);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);