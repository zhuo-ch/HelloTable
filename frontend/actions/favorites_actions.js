import * as FavoritesAPIUtil from '../util/favorites_util';

export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
export const RECEIVE_FAVORITE = 'RECEIVE_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const receiveAllFavorites = favorites => dispatch => {
  return dispatch(receiveFavorites(favorites));
}

export const addFavorite = newFavorite => dispatch => {
  return FavoritesAPIUtil.createFavorite(newFavorite)
    .then(favorite => dispatch(receiveFavorite(favorite)));
}

export const removeFavorite = favorite => dispatch => {
  return FavoritesAPIUtil.destroyFavorite(favorite)
    .then(dispatch(receiveRemoveFavorite(favorite)));
}

const receiveFavorites = favorites => ({
  type: RECEIVE_FAVORITES,
  favorites,
});

const receiveFavorite = favorite => ({
  type: RECEIVE_FAVORITE,
  favorite,
});

const receiveRemoveFavorite = favorite => ({
  type: REMOVE_FAVORITE,
  favorite
});
