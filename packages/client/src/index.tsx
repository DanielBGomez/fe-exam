// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// React setup
const DOM_ELEMENT = document.getElementById('root');
if (!DOM_ELEMENT) throw new Error('Unable to find the dom element');
const root = ReactDOM.createRoot(DOM_ELEMENT);

root.render(
  <React.StrictMode>
    <h1>React</h1>
  </React.StrictMode>
);