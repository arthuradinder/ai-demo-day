import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/theme.css';
import { App } from './App';

const host = document.getElementById('root');
if (!host) throw new Error('#root not found in index.html');

createRoot(host).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
