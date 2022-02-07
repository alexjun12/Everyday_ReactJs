import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Modal from 'react-modal';  

Modal.setAppElement('#root');

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
