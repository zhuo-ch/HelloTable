import { hashHistory } from 'react-router';
import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

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
