import { merge } from 'lodash';
import { RECEIVE_ALL_RESERVATIONS } from '../actions/reservations_actions';

const _nullReservations = Object.freeze({

});

const ReservationsReducer = (state = _nullReservations, action) => {
  debugger
  switch(action.type) {
    case RECEIVE_ALL_RESERVATIONS:
      return merge({}, state, action.reservations);
    default:
      return state;
  }
}

export default ReservationsReducer;
