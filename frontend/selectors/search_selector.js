export const searchSelector = restaurants => {
  return restaurants.map(res => {
    const id = Object.keys(res);
    return res[id];
  })
};

export const restaurantFilter = (restaurants, searchTerm) => {
  return restaurants.filter(res  => res.restaurant_name.toLowerCase().indexOf(searchTerm) > -1);
}

export const cityFilter = (cities, searchTerm) => {
  return cities.filter(city => city.name.toLowerCase().indexOf(searchTerm) > -1);
}
