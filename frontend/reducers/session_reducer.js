import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  LOGOUT,
  RECEIVE_DESTROY_RESERVATION
} from '../actions/session_actions';
import { RECEIVE_RESERVATION } from '../actions/reservations_actions';
import { mergeReview } from '../selectors/review_selectors';
import { RECEIVE_REVIEW } from '../actions/review_actions';

const _nullUser = Object.freeze({
  currentUser: {},
  errors: []
});

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
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
    case RECEIVE_RESERVATION:
      const reservations = Object.assign([], state.currentUser.reservations, [action.reservation]);
      return merge({}, state, {currentUser: { reservations: reservations }});
    case RECEIVE_DESTROY_RESERVATION:
      let newStateRes = merge({}, state);
      newStateRes.currentUser.reservations = newStateRes.currentUser.reservations.filter((res) => res.id != action.id)
      return newStateRes;
    case RECEIVE_REVIEW:
      const mergedReview = mergeReview(state.currentUser.reservations, action.review);
      return merge({}, state, { currentUser: { reservations: mergedReview }});
    default:
      return state;
  }
};

export default SessionReducer;
