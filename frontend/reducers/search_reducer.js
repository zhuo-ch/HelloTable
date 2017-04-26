import { merge } from 'lodash';
import { RECEIVE_SEARCH } from '../actions/search_actions'
import { searchSelector } from '../selectors/search_selector';

const _nullSearch = Object.freeze ({
  cities: [],
  restaurants: [],
});

const SearchReducer = (state = _nullSearch, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH:
      const restaurants = searchSelector(action.search.restaurants);
      const cities = action.search.cities;
      const newState = merge({}, state, { restaurants, cities })
      return merge({}, state, newState);
    default:
      return state;
  }
}

export default SearchReducer;
