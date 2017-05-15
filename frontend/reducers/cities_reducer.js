import { merge } from 'lodash';
import { RECEIVE_ALL_CITIES, RECEIVE_CITY } from '../actions/city_actions';

const _nullCities = {
  city: {
    city_name: "",
    main_photo: "",
    restaurants: [],
  }
}

const CitiesReducer = (state = _nullCities, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CITIES:
      return merge({}, state, action.cities);
    case RECEIVE_CITY:
      const restaurants = action.city.restaurants
      const city = merge({}, action.city, {restaurants})
      debugger
      return merge({}, state, {city});
    default:
      return state;
  }
}

export default CitiesReducer;
