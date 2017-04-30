import * as UserApiUtil from '../util/user_api_util';
import { hashHistory } from 'react-router'

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_DESTROY = 'RECEIVE_DESTROY';

export const fetchUser = id => dispatch => {
  return UserApiUtil.fetchUser(id)
    .then((user) => dispatch(receiveUser(user)));
}

export const destroyReservation = id => dispatch => {
  return UserApiUtil.destroyReservation(id)
    .then((res) => dispatch(receiveDestroy(res.id)));
}

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

const receiveDestroy = id => ({
  type: RECEIVE_DESTROY,
  id
})
