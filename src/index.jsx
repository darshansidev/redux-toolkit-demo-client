import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './features/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> 
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>

);
