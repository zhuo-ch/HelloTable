export const fetchAllReservations = (date, time, restaurant_id) => {
  return $.ajax({
    method: 'GET',
    url: '/api/restaurants/:restaurant_id/reservations',
    data: {date, time, restaurant_id}
  })
}


export const deleteReservation = (reservation_id) => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/restaurants/:restaurant_id/reservations/:id'
  })
}

// export const createReservation = (reservation) => {
//   return $.ajax({
//     method: 'POST',
//     url: '/api/restaurants/:restaurant_id/reservations',
//     data: {reservation}
//   })
// }
