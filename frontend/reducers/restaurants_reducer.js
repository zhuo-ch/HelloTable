import { merge } from 'lodash';
import { RECEIVE_ALL_RESTAURANTS,
  RECEIVE_RESTAURANT,
  RECEIVE_RESET_RESTAURANT,
  RECEIVE_DESTROY,
  RECEIVE_ERRORS,
} from '../actions/restaurant_actions';
import { RECEIVE_SEARCH } from '../actions/search_actions'

const _nullRestaurants = Object.freeze({
  restaurant: {
    id: "",
    restaurant_name: "",
    restaurant_number: "",
    hours: "",
    cuisine: "",
    street_address: "",
    city: "",
    state: "",
    zip: "",
    description: "",
    site: "",
    owner_id: "",
    images: [],
    lat: "",
    lng: "",
    city_id: "",
  },
  errors: [],
});

const RestaurantsReducer = (state = _nullRestaurants, action) => {
  switch(action.type) {
    case RECEIVE_ALL_RESTAURANTS:
      return action.restaurants;
    case RECEIVE_RESTAURANT:
      const newState = merge({}, state, { restaurant: action.restaurant });
      return newState;
    case RECEIVE_RESET_RESTAURANT:
      const restaurant = _nullRestaurants.restaurant;
      return merge({}, state, { restaurant })
    case RECEIVE_DESTROY:
      return _nullRestaurants;
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return Object.assign({}, state, {errors});
    default:
      return state;
  }
}

export default RestaurantsReducer;
