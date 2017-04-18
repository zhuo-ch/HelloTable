import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';

const SessionReducer = (store = {}, action) => {
  Object.freeze(store);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, store, action.session);
    case RECEIVE_ERRORS:
      return ;
    default:
      return store;
  }
}

export default SessionReducer;
