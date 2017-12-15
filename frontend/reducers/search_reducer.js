import { merge } from 'lodash';
import {
  RECEIVE_SEARCH,
  RECEIVE_SEARCH_PARAMS,
  RECEIVE_SEARCH_BOX_PARAMS,
  RECEIVE_FILTER,
} from '../actions/search_actions';
import {
  searchSelector,
  cityFilter,
  restaurantFilter,
} from '../selectors/search_selector';
import * as SearchUtil from '../util/search_util';

const _nullSearch = Object.freeze ({
  cities: [],
  restaurants: [],
  searchParams: {
    seats: 2,
    date: SearchUtil.formatDate(new Date()),
    time: SearchUtil.getNewTime(),
    timeSlots: [],
  },
  searchBoxParams: {
    searching: false,
    searchId: null,
    searchType: 'restaurant',
    searchTerm: '',
    delay: '',
  }
});

const SearchReducer = (state = _nullSearch, action) => {
  Object.freeze(state);
  let restaurants;
  let cities;

  switch (action.type) {
    case RECEIVE_SEARCH_PARAMS:
      const searchParams = action.params;
      return merge({}, state, { searchParams });
    case RECEIVE_SEARCH_BOX_PARAMS:
      const searchBoxParams = action.params;
      return merge({}, state, { searchBoxParams });
    case RECEIVE_SEARCH:
      restaurants = searchSelector(action.search.restaurants);
      cities = action.search.cities;
      return Object.assign({}, state, { restaurants, cities });
    case RECEIVE_FILTER:
      restaurants = restaurantFilter(state.restaurants, action.searchTerm);
      cities = cityFilter(state.cities, action.searchTerm);
      return Object.assign({}, state, { restaurants, cities });
    default:
      return state;
  }
}

export default SearchReducer;
