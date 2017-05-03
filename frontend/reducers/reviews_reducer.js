import { merge } from 'lodash';
import { RECEIVE_ALL_REVIEWS,
  RECEIVE_REVIEW,
  RECEIVE_DESTROY,
} from '../actions/review_actions';

const _nullReviews = ([])

const ReviewsReducer = (state = _nullReviews, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_REVIEWS:
      return Object.assign([], state, action.reviews);
    case RECEIVE_REVIEW:
      const newState = Object.assign([], state)
      newState.push(action.review);
      return newState;
    case RECEIVE_DESTROY:
      const desState = Object.assign([], state)
      desState = desState.filter((rev) => rev.id !== action.id)
      return desState;
    default:
      return state;
  }
}

export default ReviewsReducer;
