import { merge } from 'lodash';

export const mergeSeating = (state, seating) => {
  let newState = merge([], state);
debugger
  if (newState.find(el => el.id === seating.id)) {
    newState = newState.map(el => el.id === seating.id ? seating : el);
  } else {
    newState.push(seating);
  }

  return newState.sort((a, b) => a.seats - b.seats);
}

export const removeSeating = (state, seating) => {
  let newState = merge([], state);
  newState = newState.filter(el => el.id !== seating.id);

  return newState;
}
