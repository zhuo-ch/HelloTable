import { hashHistory } from 'react-router';
import * as RestaurantAPIUtil from '../util/restaurant_api_util';

export const RECEIVE_ALL_RESTAURANTS = 'RECEIVE_ALL_RESTAURANTS';
export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_RESTAURANT_RESERVATIONS = 'RECEIVE_RESTAURANT_RESERVATIONS';
export const RECEIVE_ALL_REVIEWS = 'RECEIVE_ALL_REVIEWS';
export const RECEIVE_RESET_RESTAURANT = 'RECEIVE_RESET_RESTAURANT';
export const RECEIVE_DESTROY = 'RECEIVE_DESTROY';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const fetchAllRestaurants = cityId => dispatch => {
  return RestaurantAPIUtil.fetchAllRestaurants(cityId)
    .then((restaurants) => {
      dispatch(receiveAllRestaurants(restaurants));
    });
}

export const createRestaurant = restaurant => dispatch => {
  return RestaurantAPIUtil.createRestaurant(restaurant)
    .then((newRestaurant) => dispatch(receiveRestaurant(newRestaurant)),
      err => dispatch(receiveErrors(err.responseJSON)));
}

export const fetchRestaurant = id => dispatch => {
  return RestaurantAPIUtil.fetchRestaurant(id)
    .then(restaurant => {
      dispatch(receiveRestaurant(restaurant));
      dispatch(receiveRestaurantReservations(restaurant.reservations));
      dispatch(receiveAllReviews(restaurant));
    });
}

export const resetRestaurant = () => dispatch => {
  dispatch(receiveResetRestaurant());
}

export const updateRestaurant = (restaurant) => dispatch => {
  return RestaurantAPIUtil.updateRestaurant(restaurant)
    .then((newRestaurant) => dispatch(receiveRestaurant(newRestaurant)));
}

export const deleteRestaurant = (id) => dispatch => {
  return RestaurantAPIUtil.deleteRestaurant(id)
    .then(() => dispatch(recieveDelete()));
}

const receiveAllRestaurants = (restaurants) => ({
  type: RECEIVE_ALL_RESTAURANTS,
  restaurants,
});

const receiveRestaurant = (restaurant) => ({
  type: RECEIVE_RESTAURANT,
  restaurant,
});

const receiveRestaurantReservations = reservations => ({
  type: RECEIVE_RESTAURANT_RESERVATIONS,
  reservations
});

const receiveAllReviews = restaurant => ({
  type: RECEIVE_ALL_REVIEWS,
  restaurant,
});

const receiveResetRestaurant = () => ({
  type: RECEIVE_RESET_RESTAURANT,
});

const receiveDestroy = () => ({
  type: RECEIVE_DESTROY,
});

const receiveErrors = (errors) => {
  return ({
    type: RECEIVE_ERRORS,
    errors
  });
}
