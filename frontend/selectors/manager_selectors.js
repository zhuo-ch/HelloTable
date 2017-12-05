import { merge } from 'lodash';

export const mergeSeating = (state, seating) => {
  const newState = merge({}, state);
  let seatings = merge([], state.restaurant.seatings);

  if (seatings.find(el => el.id === seating.id)) {
    seatings = seatings.map(el => el.id === seating.id ? seating : el);
  } else {
    seatings.push(seating);
  }

  newState.restaurant.seatings = seatings;

  return newState;
}

export const mergeHours = (state, hour) => {
  const newState = merge({}, state);
  let hours = merge([], state.restaurant.hours);
  hours = hours.map(el => el.id === hour.id ? hour : el);
  newState.restaurant.hours = hours;

  return newState;
}

export const removeSeating = (state, seating) => {
  const newState = merge({}, state);
  let seatings = merge([], state.restaurant.seatings);
  seatings = seatings.filter(el => el.id !== seating.id);
  newState.restaurant.seatings = seatings;

  return newState;
}
