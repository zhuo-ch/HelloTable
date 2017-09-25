json.extract! @restaurant, :id, :owner_id, :restaurant_name, :address, :location
  :name, :restaurant_number, :cuisine, :description, :hours, :site,
json.ratings @restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
json.reviews @restaurant.reviews do |review|
  json.extract! review, :id, :reservation_id, :rating, :details, :food, :service, :ambiance, :value
  json.username review.user.username
  json.date review.reservation.date
end
json.images @restaurant.photos.map { |photo| asset_path(photo.image.url) }
# json.reviews do
#   json.ratings do
#
#   end
# end
