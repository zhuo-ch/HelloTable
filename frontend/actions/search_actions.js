import { hashHistory } from 'react-router';
import * as SearchApiUtil from '../util/search_api_util';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

export const searchRestaurants = (query, callback) => dispatch => {
  return SearchAPIUtil.searchRestaurants(query)
    .then((restaurants) => dispatch(receiveSearch(restaurants)));
}

export const findRestaurants = (query, callback) => dispatch => {
  return SearchAPIUtil.findRestaurants(query)
    .then((restaurants))
}

const receiveSearch = (restaurants) => ({
    type: RECEIVE_SEARCH,
    restaurants,
})
