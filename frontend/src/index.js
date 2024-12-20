import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.min.css'

import './index.css';
import App from './App';

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
