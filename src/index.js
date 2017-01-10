import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';
import { createStore, dispatch } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import App from './components';
import store from './store';

render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
