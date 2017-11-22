import { merge } from 'lodash';
import { RECEIVE_MANAGER_RESTAURANT,
  RECEIVE_UPDATED_HOURS,
  RECEIVE_UPDATED_SEATING,
  RECEIVE_SEATING,
} from '../actions/manager_actions';
import * as ManagerSelector from '../selectors/manager_selectors';

const _nullRestaurant = Object.freeze({});

const ManagerReducer = (state = _nullRestaurant, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MANAGER_RESTAURANT:
      return merge({}, state, action.restaurant);
    case RECEIVE_UPDATED_SEATING:
      const restaurantSeating = Object.assign({}, state);
      restaurantSeating.seatings = ManagerSelector.mergeSeating(restaurantSeating.seatings, action.seating);

      return restaurantSeating;
    case RECEIVE_UPDATED_HOURS:
      const restaurantHours = Object.assign({}, state);
      restaurantHours.hours = ManagerSelector.mergeHours(restaurantHours.hours, action.hour);

      return restaurantHours;
    case RECEIVE_SEATING:
    debugger
      const newState = Object.assign({}, state);
      state.seatings.push(action.seating);
      return newState;
    default:
      return state;
  }
}

export default ManagerReducer;
