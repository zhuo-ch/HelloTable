export const fetchAllReviews = (restaurant_id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/restaurants/${restaurant_id}/reviews`
  })
}

export const fetchReview = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/restaurants/:restaurant_id/reviews/${id}`,
  })
}

export const createReview = (restaurant_id, review) => {
  return $.ajax({
    method: 'POST',
    url: `/api/restaurants/${restaurant_id}/reviews`,
    data: {review}
  })
}

export const destroyReview = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/restaurants/:restaurant_id/reviews/${id}`
  })
}
