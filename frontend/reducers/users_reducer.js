import { merge } from 'lodash';
import { RECEIVE_USER } from '../actions/user_actions';

const _nullUser = {
  reservations: {}
}

const UsersReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    default:
      return state;
  }
}

export default UsersReducer;
