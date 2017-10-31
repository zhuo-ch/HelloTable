export const getManagerRestaurant = id => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${id}/manager/${id}`,
  });
}
