import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { merge } from 'lodash';
import { faves } from './selectors/favorites_selector';

document.addEventListener('DOMContentLoaded', () => {
  let store;

    if (window.currentUser) {
      const preloadedState = {
        session: { currentUser: window.currentUser, errors: []},
        favorites: faves(window.currentUser.favorites),
        };
      store = configureStore(preloadedState);
    } else {
      store = configureStore({session:{errors: []}});
    }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
