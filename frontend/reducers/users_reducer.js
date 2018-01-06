import { merge } from 'lodash';
import { RECEIVE_USER, RESET_USER } from '../actions/user_actions';

const _nullUser = Object.freeze({});

const UserReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, action.user);
    case RESET_USER:
      return _nullUser;
    default:
      return state;
  }
}

export default UserReducer;
