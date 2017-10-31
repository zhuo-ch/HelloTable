import { merge } from 'lodash';
import { RECEIVE_MANAGER_RESTAURANT } from '../actions/manager_actions';

const _nullRestaurant = Object.freeze({});

const ManagerReducer = (state = _nullRestaurant, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MANAGER_RESTAURANT:
      return action.restaurant;
    default:
      return state;
  }
}

export default ManagerReducer;
