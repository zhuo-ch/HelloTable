export const fetchAllReservations = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/reservations/search',
    data: { query }
  })
}


export const deleteReservation = (reservation_id) => {
  return $.ajax({
    method: 'DELETE',
    url: 'api/restaurants/:restaurant_id/reservations/:id'
  })
}

// export const createReservation = (reservation) => {
//   return $.ajax({
//     method: 'POST',
//     url: '/api/restaurants/:restaurant_id/reservations',
//     data: {reservation}
//   })
// }
