import { merge } from 'lodash';
import { RECEIVE_SEATING } from '../action/manager_actions';
import { RECEIVE_SEARCH } from '../actions/search_actions';

const _nullSeatings = Object.freeze({});

const SeatingsReducer = (state = _nullSeatings, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEATING:

    default:
      return state;
  }
}

export default SeatingsReducer;
