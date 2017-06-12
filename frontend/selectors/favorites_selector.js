export const faves = favorites => {
  let favs = {};

  favorites.forEach(fav => {
    favs[fav.restaurant_id] = fav;
  });

  return favs;
}
