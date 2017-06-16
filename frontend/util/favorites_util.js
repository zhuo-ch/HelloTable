export const createFavorite = favorite => {
  return $.ajax({
    method: 'POST',
    url: `api/users/${favorite.user_id}/favorites`,
    data: { favorite },
  })
}

export const destroyFavorite = favorite => {
  return $.ajax({
    method: 'DELETE',
    url: `api/users/${favorite.user_id}/favorites/${favorite.id}`,
  })
}
