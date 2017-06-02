import { merge } from 'lodash';
import {
  RECEIVE_SEARCH,
  RECEIVE_SEARCH_PARAMS,
  RECEIVE_SEARCH_BOX_PARAMS
} from '../actions/search_actions';
import { searchSelector } from '../selectors/search_selector';
import * as SearchAPIUtil from '../util/search_api_util';

const _nullSearch = Object.freeze ({
  cities: [],
  restaurants: [],
  searchParams: {
    seats: 2,
    date: SearchAPIUtil.formatDate(new Date()),
    time: SearchAPIUtil.getNewTime(),
    timeSlots: [],
  },
  searchBoxParams: {
    searching: false,
    searchId: null,
    searchType: 'restaurant',
    searchTerm: '',
  }
});

const SearchReducer = (state = _nullSearch, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_PARAMS:
      const searchParams = action.params;
      return merge({}, state, { searchParams });
    case RECEIVE_SEARCH_BOX_PARAMS:
      const searchBoxParams = action.params;
      return merge({}, state, { searchBoxParams });
    case RECEIVE_SEARCH:
      const restaurants = searchSelector(action.search.restaurants);
      const cities = action.search.cities;
      return Object.assign({}, state, { restaurants, cities })
    default:
      return state;
  }
}

export default SearchReducer;
