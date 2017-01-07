import React from 'react';
import { render } from 'react-dom';
import { createStore, dispatch } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import App from './components/App';

let store = createStore(rootReducer);

render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
