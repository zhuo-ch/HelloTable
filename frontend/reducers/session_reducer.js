import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOGOUT } from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null,
  errors: []
});

const SessionReducer = (state = _nullUser, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.user;
      return merge({}, state, { currentUser });
    case RECEIVE_ERRORS:
      const errors = action.errors;
      const newState = merge({}, state);
      newState.errors = errors;
      return newState;
    case LOGOUT:
      return _nullUser;
    default:
      return state;
  }
};

export default SessionReducer;
