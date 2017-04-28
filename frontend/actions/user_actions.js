import * as UserApiUtil from '../util/user_api_util';
import { hashHistory } from 'react-router'

export const RECEIVE_USER = 'RECEIVE_USER';

export const fetchUser = id => dispatch => {
  return UserApiUtil.fetchUser(id)
    .then((user) => dispatch(receiveUser(user)));
}

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})
