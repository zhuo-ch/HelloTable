import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOGOUT } from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null,
});

const SessionReducer = (state = _nullUser, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, {currentUser});
    case RECEIVE_ERRORS:
      return merge({}, state, {errors: action.errors});
    case LOGOUT:
      return _nullUser;
    default:
      return state;
  }
};

export default SessionReducer;
