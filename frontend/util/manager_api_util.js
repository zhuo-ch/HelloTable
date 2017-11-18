export const getManagerRestaurant = id => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${id}/manager/${id}`,
  });
}

export const updateRestaurant = params => {
  const id = params.user_id;

  return $.ajax({
    method: 'PATCH',
    url: `api/users/${id}/manager/${id}`,
    data: params,
  });
}
