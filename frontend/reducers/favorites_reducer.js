import { RECEIVE_FAVORITE, REMOVE_FAVORITE, RECEIVE_FAVORITES, CLEAR_FAVORITES } from '../actions/favorites_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { LOGOUT } from '../actions/session_actions';
import * as FavoritesSelector from '../selectors/favorites_selector';
import { merge } from 'lodash';

const _nullFavorites = {}

const FavoritesReducer = (state = _nullFavorites, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_FAVORITES:
      const favorites = FavoritesSelector.faves(action.favorites);
      return favorites;
    case RECEIVE_USER:
      return FavoritesSelector.faves(action.user.favorites);
    case RECEIVE_FAVORITE:
    const favorite = FavoritesSelector.fave(action.favorite);
      return merge({}, state, favorite);
    case REMOVE_FAVORITE:
      let newState = merge({}, state);
      delete newState[action.favorite.restaurant_id];
      return newState;
    case LOGOUT:
      return _nullFavorites
    default:
      return state;
  }
}

export default FavoritesReducer;
