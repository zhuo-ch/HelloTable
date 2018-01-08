import * as UserAPIUtil from '../util/user_api_util';
import { RECEIVE_USER_RESERVATIONS, receiveUserReservations } from './reservations_actions';
import { RECEIVE_FAVORITES, receiveFavorites } from './favorites_actions';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RESET_USER = 'RESET_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const fetchUser = id => dispatch => {
  return UserAPIUtil.getUser(id)
    .then(user => dispatch(receiveUser(user)),
      err => dispatch(receiveErrors(err.responseJSON)));
}

export const resetUser = () => dispatch => {
  return dispatch(receiveResetUser());
}

const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
});

const receiveResetUser = () => ({
  type: RESET_USER,
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});
