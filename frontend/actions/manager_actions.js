import { merge } from 'lodash';
import * as ManagerAPIUtil from '../util/manager_api_util';
import { fetchManagerRestaurantReservations } from './reservations_actions';
import { resetCurrentModal } from './modal_actions';

export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_ALL_REVIEWS = 'RECEIVE_ALL_REVIEWS';
export const RECEIVE_HOURS = 'RECEIVE_HOURS';
export const RECEIVE_SEATINGS = 'RECEIVE_SEATINGS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const fetchManagerRestaurant = id => dispatch => {
  return ManagerAPIUtil.getManagerRestaurant(id)
    .then(restaurant => {
      dispatch(receiveRestaurant(restaurant));
      dispatch(receiveReviews(restaurant))
      dispatch(receiveHours(restaurant.hours));
      dispatch(receiveSeatings(restaurant.seatings));
    })
    .then(() => dispatch(resetCurrentModal()));
}

export const updateRestaurant = restaurant => dispatch => {
  return ManagerAPIUtil.updateRestaurant(restaurant)
    .then(updatedRestaurant => dispatch(receiveRestaurant(updatedRestaurant))
      , errors => {
        dispatch(resetCurrentModal());
        dispatch(receiveErrors(errors));
      })
    .then(() => dispatch(resetCurrentModal()));
}

export const clearErrors = () => dispatch => {
  return dispatch(receiveClearErrrors());
}

const receiveRestaurant = restaurant => ({
  type: RECEIVE_RESTAURANT,
  restaurant,
});

const receiveReviews = restaurant => ({
  type: RECEIVE_ALL_REVIEWS,
  restaurant,
})

const receiveSeatings = seating => ({
  type: RECEIVE_SEATINGS,
  seating,
});

const receiveHours = hours => ({
  type: RECEIVE_HOURS,
  hours,
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});

const receiveClearErrrors = () => ({
  type: CLEAR_ERRORS,
});
