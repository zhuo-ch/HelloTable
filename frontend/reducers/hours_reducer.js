import { merge } from 'lodash';
import { RECEIVE_HOURS, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/manager_actions';
import { RECEIVE_HOUR } from '../actions/hours_actions';
import * as ManagerSelector from '../selectors/manager_selectors';

const _nullHours = Object.freeze([]);

const HoursReducer = (state = _nullHours, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_HOURS:
      return action.hours;
    case RECEIVE_HOUR:
      return ManagerSelector.mergeHours(state, action.hour);
    case RECEIVE_ERRORS:
      const hourErrors = merge([], state);
      hourErrors.errors = action.errors.responseJSON;
      return hourErrors;
    case CLEAR_ERRORS:
      const clearErrors = merge([], state);
      clearErrors.errors = [];
      return clearErrors;
    default:
      return state;
  }
}

export default HoursReducer;
