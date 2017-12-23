import { merge } from 'lodash';
import { RECEIVE_HOURS, UPDATE_HOUR } from '../actions/hours_actions';

const _nullHours = Object.freeze([]);

const HoursReducer = (state, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_HOURS:
      return action.hours;
    case RECEIVE_UPDATED_HOURS:
      const newHours = merge([], state);
      const idx = newHours.indexOf(el => el.id === action.hour.id);
      newHours[idx] = action.hour;
      return newHours;
    default:
      return state;
  }
}

export default HoursReducer;
