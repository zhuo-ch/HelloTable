import React from 'react';
import * as ReviewAPIUtil from '../util/review_api_util';

export const RECEIVE_ALL_REVIEWS = 'RECEIVE_ALL_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const RECEIVE_DESTROY = 'RECEIVE_DESTROY';
export const RECEIVE_CURRENT_MODAL = 'RECEIVE_CURRENT_MODAL';

export const fetchAllReviews = (restaurant_id) => dispatch => {
  return ReviewAPIUtil.fetchAllReviews(restaurant_id)
    .then(reviews => dispatch(receiveAllReviews(reviews)));
}

export const fetchReview = id => dispatch => {
  return ReviewAPIUtil.fetchReview(id)
    .then(review => dispatch(receiveReview(review)));
}

export const createReview = review => dispatch => {
  return ReviewAPIUtil.createReview(review)
    .then(review => dispatch(receiveReview(review)))
    .then(() => dispatch(receiveCurrentModal({ hidden: false, type: 'thankyou' })));
}

export const destroyReview = id => dispatch => {
  return ReviewAPIUtil.destroyReview(id)
    .then(review => dispatch(receiveDestroy(review)));
}

export const receiveAllReviews = restaurant => ({
    type: RECEIVE_ALL_REVIEWS,
    restaurant,
});

const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review,
});

const receiveDestroy = review => ({
  type: RECEIVE_DESTROY,
  review,
});

const receiveCurrentModal = modal => ({
  type: RECEIVE_CURRENT_MODAL,
  modal,
});
