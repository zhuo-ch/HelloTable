import { merge } from 'lodash';

export const mergeHours = (state, hour) => {
  let hours = merge([], state);
  hours = hours.map(el => el.id === hour.id ? hour : el);

  return hours;
}
