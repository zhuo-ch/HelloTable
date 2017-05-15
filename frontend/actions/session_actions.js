import * as SessionApiUtil from '../util/session_api_util';
import { hashHistory } from 'react-router'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOGOUT = 'LOGOUT';

export const login = (user) => dispatch => {
  return SessionApiUtil.login(user)
    .then((newUser) => {
      dispatch(receiveCurrentUser(newUser));
      dispatch(receiveErrors(errors));
    },
      err => dispatch(receiveErrors(err.responseJSON)));
};

export const signup = (user) => dispatch => {
  return SessionApiUtil.signup(user)
    .then((newUser) => {
      dispatch(receiveCurrentUser(newUser));
      dispatch(receiveErrors(errors));
    },
      err => dispatch(receiveErrors(err.responseJSON)));
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout()
    .then(() => dispatch(logOutUser()));
};

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: user
});

export const receiveErrors = (errors) => {
  return ({
    type: RECEIVE_ERRORS,
    errors
  });
};

const logOutUser = () => ({
  type: LOGOUT,
});
