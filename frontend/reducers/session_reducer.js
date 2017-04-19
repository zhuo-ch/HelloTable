import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null,
});

const SessionReducer = (store = _nullUser, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const current = {currentUser: action.currentUser};
      return merge({}, store, current);
    case RECEIVE_ERRORS:
      return merge({}, store, {errors: action.errors});
    default:
      return store;
  }
};

export default SessionReducer;
