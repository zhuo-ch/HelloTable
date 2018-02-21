export const faves = favorites => {
  let favs = {};

  favorites.forEach(fav => {
    favs[fav.id] = fav;
  });

  return favs;
}

export const fave = favorite => {
  return {[favorite.id]: favorite};
}
