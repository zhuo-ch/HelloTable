import { merge } from 'lodash';
import { RECEIVE_MANAGER_RESTAURANT,
  RECEIVE_UPDATED_HOURS,
  RECEIVE_UPDATED_SEATING
} from '../actions/manager_actions';

const _nullRestaurant = Object.freeze({});

const ManagerReducer = (state = _nullRestaurant, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MANAGER_RESTAURANT:
      return action.restaurant;
    case RECEIVE_UPDATED_SEATING:
      const restaurantSeating = Object.assign({}, state);
      debugger
    case RECEIVE_UPDATED_HOURS:

    default:
      return state;
  }
}

export default ManagerReducer;
