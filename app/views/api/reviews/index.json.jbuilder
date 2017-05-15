json.ratings @reviews[0].restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
json.list @reviews do |review|
    json.extract! review, :id, :reservation_id, :rating, :details, :food, :service, :ambiance, :value
    json.username review.user.username
    json.date review.reservation.date
  end
