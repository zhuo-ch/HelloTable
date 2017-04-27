import { hashHistory } from 'react-router';
import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

export const receiveSearchResults = (query) => ({
  type: RECEIVE_SEARCH_RESULTS,
  query,
});

export const searchRestaurants = (query, callback) => dispatch => {
  return SearchAPIUtil.searchRestaurants(query)
    .then((search) => dispatch(receiveSearch(search)));
}

export const findRestaurants = (query, callback) => dispatch => {
  return SearchAPIUtil.findRestaurants(query)
    .then((restaurants))
}

const receiveSearch = (search) => ({
    type: RECEIVE_SEARCH,
    search,
})
