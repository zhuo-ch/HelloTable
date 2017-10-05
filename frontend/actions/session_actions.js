import * as SessionApiUtil from '../util/session_api_util';
import * as UserApiUtil from '../util/user_api_util';
import { hashHistory } from 'react-router'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOGOUT = 'LOGOUT';
export const RECEIVE_DESTROY_RESERVATION = 'RECEIVE_DESTROY_RESERVATION';
const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
const RECEIVE_RESERVATIONS = 'RECEIVE_RESERVATIONS';
const RECEIVE_USER_RESERVATIONS = 'RECEIVE_USER_RESERVATIONS';

export const login = user => dispatch => {
  return SessionApiUtil.login(user)
    .then((newUser) => {
      dispatch(receiveCurrentUser(newUser));
      dispatch(receiveAllFavorites(newUser.favorites));
      dispatch(receiveUserReservations(newUser.reservations));
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
    .then(() => dispatch(logOutUser()));
};

export const destroyReservation = id => dispatch => {
  return UserApiUtil.destroyReservation(id)
    .then((res) => dispatch(receiveDestroy(res.id)));
}

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
})

const receiveDestroy = id => ({
  type: RECEIVE_DESTROY_RESERVATION,
  id
});
