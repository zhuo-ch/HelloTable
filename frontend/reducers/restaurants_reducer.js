import { merge } from 'lodash';
import { RECEIVE_ALL_RESTAURANTS,
  RECEIVE_RESTAURANT,
  RECEIVE_DESTROY,
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
});

const RestaurantsReducer = (state = _nullRestaurants, action) => {
  switch(action.type) {
    case RECEIVE_ALL_RESTAURANTS:
      return action.restaurants;
    case RECEIVE_RESTAURANT:
      const restaurant = action.restaurant
      const newState = merge({}, state, { restaurant });
      return newState;
    case RECEIVE_DESTROY:
      return _nullRestaurants;
    default:
      return state;
  }
}

export default RestaurantsReducer;
