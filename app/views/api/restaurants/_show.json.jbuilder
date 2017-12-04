json.extract! restaurant, :id, :user_id, :name, :address, :location,
:phone, :cuisine, :description, :hours, :site, :seatings
json.ratings restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
json.reviews restaurant.reviews do |review|
  json.extract! review, :id, :reservation_id, :rating, :details, :food, :service, :ambiance, :value
  json.username review.user.username
  json.date review.reservation.date
end
json.images restaurant.photos.map { |photo| asset_path(photo.image.url) }
