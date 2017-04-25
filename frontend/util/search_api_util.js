export const searchRestaurants = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/restaurants/search',
    data: {query},
  })
}

export const findRestaurants = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/restaurants/search',
    data: {query},
  })
}
