import { merge } from 'lodash';

export const mergeHours = (state, hour) => {
  const newState = merge({}, state);
  let hours = merge([], state.restaurant.hours);
  hours = hours.map(el => el.id === hour.id ? hour : el);
  newState.restaurant.hours = hours;

  return newState;
}
