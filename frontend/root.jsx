import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { merge } from 'lodash';
import { faves } from './selectors/favorites_selector';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {
    session: { currentUser: {}, errors: [] },
    reservations: { userReservations: [], restaurantReservations: [], currentReservation: {}},
  };

    if (window.currentUser) {
      preloadedState = merge(
        {}, preloadedState, {
          session: { currentUser: window.currentUser, errors: []},
          favorites: faves(window.currentUser.favorites),
          reservations: { userReservations: window.currentUser.reservations },
        }
      );
    }

  const store = configureStore(preloadedState);
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
