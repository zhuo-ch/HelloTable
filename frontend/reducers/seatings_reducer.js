import { merge } from 'lodash';
import { RECEIVE_SEATING } from '../actions/manager_actions';
import { RECEIVE_SEARCH } from '../actions/search_actions';
import * as SeatingsSelector from '../selectors/seatings_selectors';
const _nullSeatings = Object.freeze({});

const SeatingsReducer = (state = _nullSeatings, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEATING:
      return SeatingsSelector(state, action.seating);
    case RECEIVE_REMOVE_SEATING:
      return SeatingsSelector(state, action.seating);
    default:
      return state;
  }
}

export default SeatingsReducer;
