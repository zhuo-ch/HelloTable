import { merge } from 'lodash';
import {
  RECEIVE_MANAGER_RESTAURANT,
  RECEIVE_UPDATED_HOURS,
  RECEIVE_UPDATED_SEATING,
  RECEIVE_SEATING,
  RECEIVE_REMOVE_SEATING,
  RECEIVE_ERRORS,
  CLEAR_ERRORS,
} from '../actions/manager_actions';
import * as ManagerSelector from '../selectors/manager_selectors';

const _nullRestaurant = Object.freeze({
  errors: [],
});

const ManagerReducer = (state = _nullRestaurant, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MANAGER_RESTAURANT:
      return merge({}, state, action.restaurant);
    default:
      return state;
  }
}

export default ManagerReducer;
