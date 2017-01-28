import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';
import { createStore, dispatch } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootReducer from './reducers/index';
import App from './components/App';
import store from './store';
require('./styles.scss');

render(
  <MuiThemeProvider>
    <Provider store = { store }>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
