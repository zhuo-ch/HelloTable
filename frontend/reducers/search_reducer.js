import { merge } from 'lodash';
import { RECEIVE_SEARCH, RECEIVE_SEARCH_RESULTS } from '../actions/search_actions'
import { searchSelector } from '../selectors/search_selector';

const _nullSearch = Object.freeze ({
  cities: [],
  restaurants: [],
  searchResults: {}
});

// merge([1, 2, 3], [4, 5])
// => [4, 5] NOPE
// => [1, 2, 3, 4, 5]

const SearchReducer = (state = _nullSearch, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
    const searchResults = action.query
      return merge({}, state, {searchResults: searchResults});
    case RECEIVE_SEARCH:
      const restaurants = searchSelector(action.search.restaurants);
      const cities = action.search.cities;
      return Object.assign({}, state, { restaurants, cities })
    default:
      return state;
  }
}

export default SearchReducer;
