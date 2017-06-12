import * as FavoritesAPIUtil from '../util/favorites_util';

export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
export const RECEIVE_FAVORITE = 'RECEIVE_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const receiveAllFavorites = favorites => dispatch => {
  return dispatch(receiveFavorites(favorites));
}

export const addFavorite = favorite => dispatch => {
  return FavoritesAPIUtil.createFavorite(favorite)
    .then(dispatch(receiveFavorite(favorite)));
}

export const removeFavorite = id => dispatch => {
  return FavoritesAPIUtil.destroyFavorite(id)
    .then(dispatch(receiveRemoveFavorite(id)));
}

const receiveFavorites = favorites => ({
  type: RECEIVE_FAVORITES,
  favorites,
});

const receiveFavorite = favorite => ({
  type: RECEIVE_FAVORITE,
  favorite,
});

const receiveRemoveFavorite = id => ({
  type: REMOVE_FAVORITE,
  id
});
