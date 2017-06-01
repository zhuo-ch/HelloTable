import { hashHistory } from 'react-router';
import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const RECEIVE_SEARCH_PARAMS = 'RECEIVE_SEARCH_PARAMS';
export const RECEIVE_SEARCH_BOX_PARAMS = 'RECEIVE_SEARCH_BOX_PARAMS';

export const searchRestaurants = (query, callback) => dispatch => {
  return SearchAPIUtil.searchRestaurants(query)
    .then((search) => dispatch(receiveSearch(search)));
}

export const setSearchParams = params => dispatch => {
  dispatch(receiveSearchParams(params));
}

export const setSearchBoxParams = params => dispatch => {
  dispatch(receiveSearchBoxParams(params));
}

const receiveSearch = search => ({
    type: RECEIVE_SEARCH,
    search,
})

const receiveSearchParams = params => ({
  type: RECEIVE_SEARCH_PARAMS,
  params,
});

const receiveSearchBoxParams = params => ({
  type: RECEIVE_SEARCH_BOX_PARAMS,
  params,
})
