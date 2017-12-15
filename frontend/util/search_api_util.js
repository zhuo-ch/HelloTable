export const searchRestaurants = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/restaurants/search',
    data: {query},
  })
}
