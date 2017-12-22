import { merge } from 'lodash';

export const mergeSeating = (state, seating) => {
  let newState = merge([], state);

  if (newState.find(el => el.id === seating.id)) {
    newState = newState.map(el => el.id === seating.id ? seating : el);
  } else {
    newState.push(seating);
  }

  return sortSeating(newState);
}

export const removeSeating = (state, seating) => {
  let newState = merge([], state);
  newState = newState.filter(el => el.id !== seating.id);

  return newState;
}

export const sortSeating = seating => seating.sort((a, b) => a.seats - b.seats);
