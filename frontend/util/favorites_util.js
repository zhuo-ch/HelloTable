export const createFavorite = favorite => {
  return $.ajax({
    method: 'POST',
    url: 'api/favorites',
    data: favorite,
  })
}

export const destroyFavorite = favorite => {
  return $.ajax({
    method: 'DESTROY',
    url: `api/users/${favorite.user_id}/favorites/${favorite.id}`,
  })
}
