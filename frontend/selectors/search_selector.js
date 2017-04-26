export const searchSelector = (restaurants) => {
  return restaurants.map((res) => {
    const id = Object.keys(res);
    return res[id];
  })
}
