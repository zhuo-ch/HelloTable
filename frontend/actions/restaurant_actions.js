import * as RestaurantAPIUtil from '../util/restaurant_api_util';

export const RECEIVE_ALL_RESTAURANTS = 'RECEIVE_ALL_RESTAURANTS';
export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_DESTROY = 'RECEIVE_DESTROY';

export const fetchAllRestaurants = () => dispatch => {
  return RestaurantAPIUtil.fetchAllRestaurants()
    .then((restaurants) => dispatch(receiveAllRestaurants(restaurants)));
}

export const createRestaurant = (restaurant) => dispatch => {
  return RestaurantAPIUtil.createRestaurant(restaurant)
    .then((newRestaurant) => dispatch(receiveRestaurant(newRestaurant)));
}

export const fetchRestaurant = (id) => dispatch => {
  return RestaurantAPIUtil.fetchRestaurant(id)
    .then((restaurant) => dispatch(receiveRestaurant(restaurant)));
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
})

const receiveDestroy = () => ({
  type: RECEIVE_DESTROY,
})
