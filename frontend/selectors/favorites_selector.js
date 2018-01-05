export const faves = favorites => {
  let favs = {};

  favorites.forEach(fav => {
    favs[fav.id] = fav;
  });

  return favs;
}

export const fave = favorite => {
  const id = favorite.restaurant_id;
  return {[id]: favorite};
}
