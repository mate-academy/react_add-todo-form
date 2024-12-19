import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import React from 'react';
createRoot(document.getElementById('root') as HTMLElement).render(
  <App todos={[]} />,
);
