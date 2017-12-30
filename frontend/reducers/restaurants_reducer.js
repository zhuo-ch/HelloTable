import { merge } from 'lodash';
import {
  RECEIVE_ALL_RESTAURANTS,
  RECEIVE_RESTAURANT,
  RECEIVE_RESET_RESTAURANT,
  RECEIVE_DESTROY,
  RECEIVE_ERRORS,
} from '../actions/restaurant_actions';
import { CLEAR_ERRORS } from '../actions/manager_actions';
import { RECEIVE_SEARCH } from '../actions/search_actions';
import * as ManagerSelector from '../selectors/manager_selectors';

const _nullRestaurants = Object.freeze({
  restaurants: [],
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
    errors: [],
  },
  errors: [],
});

const RestaurantsReducer = (state = _nullRestaurants, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_RESTAURANTS:
    debugger
      return action.restaurants;
    case RECEIVE_RESTAURANT:
      return merge({}, state, { restaurant: action.restaurant });
    case RECEIVE_RESET_RESTAURANT:
      return _nullRestaurants
    case RECEIVE_DESTROY:
      return _nullRestaurants;
    case RECEIVE_ERRORS:
      const errorsRes = merge({}, state);
      errorsRes.restaurant.errors = action.errors.responseJSON;
      return errorsRes;
    case CLEAR_ERRORS:
      const _nullErrors = merge({}, state);
      _nullErrors.restaurant.errors = [];
      return _nullErrors;
    default:
      return state;
  }
}

export default RestaurantsReducer;
