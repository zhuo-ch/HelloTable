import { merge } from 'lodash';
import { RECEIVE_ALL_REVIEWS,
  RECEIVE_REVIEW,
  RECEIVE_DESTROY,
} from '../actions/review_actions';

const _nullReviews = ({
  reviews: [],
  ratings: {},
});

const ReviewsReducer = (state = _nullReviews, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_REVIEWS:
      const reviews = action.restaurant.reviews;
      const ratings = action.restaurant.ratings;
      return Object.assign({}, state, {reviews, ratings});
    case RECEIVE_REVIEW:
      let newState = Object.assign({}, state)
        if (!(newState.reviews.includes(action.review))) {
          newState.reviews.push(action.review);
        }
      return newState;
    case RECEIVE_DESTROY:
      let desState = Object.assign({}, state)
      desState = desState.filter((rev) => rev.id !== action.id)
      return desState;
    default:
      return state;
  }
}

export default ReviewsReducer;
