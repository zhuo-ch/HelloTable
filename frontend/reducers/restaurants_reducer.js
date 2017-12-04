import { merge } from 'lodash';
import {
  RECEIVE_ALL_RESTAURANTS,
  RECEIVE_RESTAURANT,
  RECEIVE_RESET_RESTAURANT,
  RECEIVE_DESTROY,
  RECEIVE_ERRORS,
} from '../actions/restaurant_actions';
import {
  RECEIVE_UPDATED_HOURS,
  RECEIVE_UPDATED_SEATING,
  RECEIVE_SEATING,
  RECEIVE_REMOVE_SEATING,
  CLEAR_ERRORS,
} from '../actions/manager_actions';
import { RECEIVE_SEARCH } from '../actions/search_actions';
import * as ManagerSelector from '../selectors/manager_selectors';

const _nullRestaurants = Object.freeze({
  restaurant: {
    id: "",
    name: "",
    phone: "",
    hours: "",
    cuisine: "",
    address: "",
    description: "",
    site: "",
    user_id: "",
    images: [],
    location: "",
    city_id: "",
  },
  errors: [],
});

const RestaurantsReducer = (state = _nullRestaurants, action) => {
  switch(action.type) {
    case RECEIVE_ALL_RESTAURANTS:
      return action.restaurants;
    case RECEIVE_RESTAURANT:
      // const newState = merge({}, state, { restaurant: action.restaurant });
      debugger
      return Object.assign({}, state, { restaurant: action.restaurant });
    case RECEIVE_RESET_RESTAURANT:
      return _nullRestaurants
    case RECEIVE_DESTROY:
      return _nullRestaurants;
    case RECEIVE_UPDATED_SEATING:
      const restaurantSeating = Object.assign({}, state);
      restaurantSeating.seatings = ManagerSelector.mergeSeating(restaurantSeating.seatings, action.seating);
      return restaurantSeating;
    case RECEIVE_UPDATED_HOURS:
      const restaurantHours = Object.assign({}, state);
      restaurantHours.restaurant.hours = ManagerSelector.mergeHours(restaurantHours.restaurant.hours, action.hour);
      return restaurantHours;
    case RECEIVE_SEATING:
      const newSeating = Object.assign({}, state);
      state.seatings.push(action.seating);
      return newSeating;
    case RECEIVE_REMOVE_SEATING:
      const removeSeating = Object.assign({}, state);
      removeSeating.seatings = state.seatings.filter(el => el.id !== action.seating.id);
      return removeSeating;
    case RECEIVE_ERRORS:
      return Object.assign({}, state, { errors: action.errors});
    case CLEAR_ERRORS:
      const _nullErrors = merge({}, state);
      _nullErrors.errors = [];
      return _nullErrors;
    default:
      return state;
  }
}

export default RestaurantsReducer;
