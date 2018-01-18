import { merge } from 'lodash';

export const filterReservations = (state, id) => {
  const newState = merge({}, state);
  const arr = state.userReservations.filter(el => el.id !== id);
  newState.userReservations = arr;

  return newState;
}
