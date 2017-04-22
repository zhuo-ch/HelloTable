import { merge } from 'lodash';
import { RECEIVE_ALL_CITIES, RECEIVE_CITY } from '../actions/city_actions';

const _nullCities = {
  1: {
    city_name: "",
    main_photo: "",
  }
}

const CitiesReducer = (state = _nullCities, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CITIES:
      return merge({}, state, action.cities);
    case RECEIVE_CITY:
      return merge({}, state, action.city);
    default:
      return _nullCities;
  }
}

export default CitiesReducer;
