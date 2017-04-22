import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import RestaurantsReducer from './restaurants_reducer';
import CitiesReducer from './cities_reducer';

export default combineReducers({
  session: SessionReducer,
  restaurants: RestaurantsReducer,
  cities: CitiesReducer,
});
