import * as SessionApiUtil from '../util/session_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOGOUT = 'LOGOUT';
const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
const RECEIVE_USER_RESERVATIONS = 'RECEIVE_USER_RESERVATIONS';
const CLEAR_FAVORITES = 'CLEAR_FAVORITES';

export const login = user => dispatch => {
  return SessionApiUtil.login(user)
    .then(newUser => {
      dispatch(receiveCurrentUser(newUser));
      dispatch(receiveUserReservations(newUser.reservations));
      dispatch(receiveAllFavorites(newUser.favorites));
    },
    err => dispatch(receiveErrors(err.responseJSON)));
};

export const signup = (user) => dispatch => {
  return SessionApiUtil.signup(user)
    .then((newUser) => {
      dispatch(receiveCurrentUser(newUser));
    }, err => dispatch(receiveErrors(err.responseJSON)));
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout()
    .then(() => {
      dispatch(logOutUser());
      dispatch(receiveUserReservations([]));
      dispatch(clearFavorites());
    });
};

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});

const logOutUser = () => ({
  type: LOGOUT,
});

const receiveAllFavorites = favorites => ({
  type: RECEIVE_FAVORITES,
  favorites,
});

const receiveUserReservations = reservations => ({
  type: RECEIVE_USER_RESERVATIONS,
  reservations,
});

const clearFavorites = () => ({
  type: CLEAR_FAVORITES,
})
