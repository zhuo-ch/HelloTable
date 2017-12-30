export const fetchAllCities = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/cities',
  });
}

export const fetchCity = (query) => {
  return $.ajax({
    method: 'GET',
    url: `api/restaurants`,
    data: query,
  });
}
