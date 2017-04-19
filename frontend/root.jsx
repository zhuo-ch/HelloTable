import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { merge } from 'lodash';


document.addEventListener('DOMContentLoaded', () => {
  let store;
  // let preloadedState = {session: {errors: {base: ""}}};
  debugger
    if (window.currentUser) {
      const preloadedState = { session: { currentUser: window.currentUser, errors: {base:""}}};
      store = configureStore();
    } else {
      store = configureStore({session:{errors:{base:""}}});
    }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
