import { hashHistory } from 'react-router';
import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const RECEIVE_SEARCH_PARAMS = 'RECEIVE_SEARCH_PARAMS';
export const RECEIVE_SEARCH_BOX_PARAMS = 'RECEIVE_SEARCH_BOX_PARAMS';
export const RECEIVE_FILTER = 'RECEIVE_FILTER';

export const searchRestaurants = (query, callback) => dispatch => {
  return SearchAPIUtil.searchRestaurants(query)
    .then((search) => dispatch(receiveSearch(search)));
}

export const filterResults = searchTerm => dispatch => {
  return dispatch(receiveFilter(searchTerm));
}

export const setSearchParams = params => dispatch => {
  return dispatch(receiveSearchParams(params));
}

export const setSearchBoxParams = params => dispatch => {
  return dispatch(receiveSearchBoxParams(params));
}

const receiveSearch = search => ({
    type: RECEIVE_SEARCH,
    search,
});

const receiveSearchParams = params => ({
  type: RECEIVE_SEARCH_PARAMS,
  params,
});

const receiveSearchBoxParams = params => ({
  type: RECEIVE_SEARCH_BOX_PARAMS,
  params,
});

const receiveFilter = searchTerm => ({
  type: RECEIVE_FILTER,
  searchTerm,
});
