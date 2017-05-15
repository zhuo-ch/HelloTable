export const fetchAllReviews = (restaurant_id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/reviews`,
    data: {restaurant_id},
  })
}

export const fetchReview = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/reviews/${id}`,
  })
}

export const createReview = (review) => {
  return $.ajax({
    method: 'POST',
    url: `/api/reviews`,
    data: {review}
  })
}

export const destroyReview = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/restaurants/:restaurant_id/reviews/${id}`
  })
}
