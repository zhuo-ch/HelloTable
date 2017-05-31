import { merge } from 'lodash';
import { RECEIVE_SEARCH, RECEIVE_SEARCH_PARAMS } from '../actions/search_actions'
import { searchSelector } from '../selectors/search_selector';
import * as SearchAPIUtil from '../util/search_api_util';

const _nullSearch = Object.freeze ({
  cities: [],
  restaurants: [],
  searchParams: {
    seats: 2,
    date: SearchAPIUtil.formatDate(new Date()),
    time: SearchAPIUtil.getNewTime(),
    searchTerm: '',
  },
});

// merge([1, 2, 3], [4, 5])
// => [4, 5] NOPE
// => [1, 2, 3, 4, 5]

const SearchReducer = (state = _nullSearch, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_PARAMS:
      const searchParams = action.query;
      return merge({}, state, {searchParams});
    case RECEIVE_SEARCH:
      const restaurants = searchSelector(action.search.restaurants);
      const cities = action.search.cities;
      return Object.assign({}, state, { restaurants, cities })
    default:
      return state;
  }
}

export default SearchReducer;
