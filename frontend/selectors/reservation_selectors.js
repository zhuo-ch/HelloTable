export const filterReservation = (arr, id) => {
  return arr.filter(el => el.id !== id);
}
