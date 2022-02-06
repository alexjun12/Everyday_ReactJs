import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Modal from 'react-modal';  

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
