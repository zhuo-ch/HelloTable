import { merge } from 'lodash';
import {
  RECEIVE_SEATING,
  RECEIVE_REMOVE_SEATING,
  RECEIVE_SEATING_ERRORS,
  CLEAR_ERRORS
} from '../actions/seating_actions';
import { RECEIVE_SEATINGS } from '../actions/manager_actions';
import * as SeatingsSelector from '../selectors/seatings_selectors';

const _nullSeatings = Object.freeze([]);

const SeatingsReducer = (state = _nullSeatings, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEATINGS:
      return SeatingsSelector.sortSeating(action.seating);
    case RECEIVE_SEATING:
      return SeatingsSelector.mergeSeating(state, action.seating);
    case RECEIVE_REMOVE_SEATING:
      return SeatingsSelector.removeSeating(state, action.seating);
    case RECEIVE_SEATING_ERRORS:
      return SeatingsSelector.mergeErrors(state, action.errors);
    case CLEAR_ERRORS:
      return SeatingsSelector.mergeErrors(state, []);
    default:
      return state;
  }
}

export default SeatingsReducer;
