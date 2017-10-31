import { merge } from 'lodash';
import * as ManagerAPIUtil from '../util/manager_api_util';

export const RECEIVE_MANAGER_RESTAURANT = 'RECEIVE_MANAGER_RESTAURANT';

export const fetchManagerRestaurant = id => dispatch => {
  return ManagerAPIUtil.getManagerRestaurant(id)
    .then(restaurant => dispatch(receiveManagerRestaurant(restaurant)));
}

const receiveManagerRestaurant = restaurant => ({
  type: RECEIVE_MANAGER_RESTAURANT,
  restaurant,
});
