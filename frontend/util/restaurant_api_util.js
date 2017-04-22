export const fetchAllRestaurants = (cityId) => {
  return $.ajax({
    method: 'GET',
    url: `api/restaurants`,
    dataType: 'json',
    data: {cityId},
  })
}

export const createRestaurant = (restaurant) => {
  return $.ajax({
    method: 'POST',
    url: 'api/restaurants',
    dataType: 'json',
    contentType: false,
    processData: false,
    data: {restaurant},
  })
}

export const fetchRestaurant = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/restaurants/${id}`
  })
}

export const updateRestaurant = (restaurant) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/restaurants/${restaurant.id}`,
    data: {restaurant}
  })
}

export const deleteRestaurant = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/restaurants/${id}`
  })
}
