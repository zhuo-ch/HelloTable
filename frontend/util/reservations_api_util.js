export const fetchAllReservations = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/reservations/search',
    data: { query }
  })
}

export const createReservation = (reservation) => {
  return $.ajax({
    method: 'POST',
    url: 'api/reservations',
    data: {reservation}
  })
}

export const deleteReservation = (reservation_id) => {
  return $.ajax({
    method: 'DELETE',
    url: 'api/restaurants/:restaurant_id/reservations/:id'
  })
}
