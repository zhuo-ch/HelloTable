import * as UserApiUtil from '../util/user_api_util';
import * as FavoritesActions from './favorites_actions';
import { hashHistory } from 'react-router'

export const RECEIVE_USER = 'RECEIVE_USER';

export const fetchUser = id => dispatch => {
  return UserApiUtil.fetchUser(id)
    .then(user => dispatch(receiveUser(user)))
    .then(user => dispatch(FavoritesActions.receiveAllFavorites(user.user.favorites)));
}

export const fetchUpdatedReservation = id => dispatch => {
  return UserApiUtil.fetchUpdatedReservation(id)
    .then(reservation => dispatch(receiveUpdate(reservation)));
}

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveUpdate = reservation => ({
  type: RECEIVE_UPDATE,
  reservation
});
