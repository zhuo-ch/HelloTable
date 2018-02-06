import { merge } from 'lodash';
import { RECEIVE_ADD_USER_RESERVATION } from '../actions/reservations_actions';
import * as ReservationsSelector from '../selectors/reservations_selectors';
import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  LOGOUT
} from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: {
    reservations: [],
    favorites: [],
  },
  errors: [],
});

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.user;
      return merge({}, state, { currentUser });
    case RECEIVE_ADD_USER_RESERVATION:
      const user = merge({}, state);
      user.currentUser.reservations.push(ReservationsSelector.formatUserReservation(action.reservation));
      return user;
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
