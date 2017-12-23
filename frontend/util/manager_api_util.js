export const getManagerRestaurant = id => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${id}/manager/${id}`,
  });
}

export const updateRestaurant = restaurant => {
  return $.ajax({
    method: 'PATCH',
    url: `api/restaurants/${restaurant.id}`,
    data: { restaurant },
  });
}
