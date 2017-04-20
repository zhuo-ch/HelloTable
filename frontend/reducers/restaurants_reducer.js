import { merge } from 'lodash';
import { RECEIVE_ALL_RESTAURANTS, RECEIVE_RESTAURANT, RECEIVE_DESTROY} from '../actions/restaurant_actions';

const _nullRestaurants = Object.freeze({
   restaurant: {
    restaurant_name: "",
    restaurant_number: "",
    cuisine: "",
    location: "",
    description: "",
    site: "",
  }
});

const RestaurantsReducer = (state = _nullRestaurants, action) => {
  switch(action.type) {
    case RECEIVE_ALL_RESTAURANTS:
      return action.restaurants;
    case RECEIVE_RESTAURANT:
    const restaurant = action.restaurant
      return merge({}, state, restaurant );
    case RECEIVE_DESTROY:
      return _nullRestaurants;
    default:
      return _nullRestaurants;
  }
}

export default RestaurantsReducer;
