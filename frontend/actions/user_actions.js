import * as UserApiUtil from '../util/user_api_util';
import { hashHistory } from 'react-router'

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_DESTROY_RESERVATION = 'RECEIVE_DESTROY_RESERVATION';
export const RECEIVE_UPDATE = 'RECEIVE_UPDATE';

export const fetchUser = id => dispatch => {
  return UserApiUtil.fetchUser(id)
    .then((user) => dispatch(receiveUser(user)));
}

export const fetchUpdatedReservation = id => dispatch => {
  return UserApiUtil.fetchUpdatedReservation(id)
    .then(reservation => dispatch(receiveUpdate(reservation)));
}

export const destroyReservation = id => dispatch => {
  return UserApiUtil.destroyReservation(id)
    .then((res) => dispatch(receiveDestroy(res.id)));
}

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

const receiveUpdate = reservation => ({
  type: RECEIVE_UPDATE,
  reservation
})

const receiveDestroy = id => ({
  type: RECEIVE_DESTROY_RESERVATION,
  id
})
