import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store/mobx';
import { Provider } from 'mobx-react';
// import { store } from './store/redux';
// import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}><App /></Provider>, document.getElementById('root'));
