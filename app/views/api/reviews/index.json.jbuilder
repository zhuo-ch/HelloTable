# debugger
# json.ratings do
#   json.rating @ratings["rating"]
#   json.food @ratings["food"]
#   json.service @ratings["service"]
#   json.ambiance @ratings["ambiance"]
#   json.value @ratings["value"]
# end
# json.extract! @ratings, :rating, :food, :service, :ambiance, :value
# json.ratings @restaurant.average_reviews(@reviews)
# json.reviewsList do
  json.array! @reviews do |review|
    json.extract! review, :id, :reservation_id, :rating, :details, :food, :service, :ambiance, :value
    json.username review.user.username
    json.date review.reservation.date
  end
# end
