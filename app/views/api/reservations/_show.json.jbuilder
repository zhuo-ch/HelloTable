json.id reservation.id
json.reviewed reservation.review ? true : false
json.extract! reservation, :time, :date, :seats
json.restaurant do
  json.image reservation.restaurant.photos.first.nil? ? asset_path(reservation.restaurant.city.image.url) : asset_path(reservation.restaurant.photos.first.image.url)
  json.extract! reservation.restaurant, :id, :name, :cuisine, :address, :location
  json.ratings do
    json.extract! reservation.restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
    json.details reservation.restaurant.reviews.length > 0 ? reservation.restaurant.reviews.sample.details : "Be the first to leave a review!"
  end
end

json.ignore_nil!
json.username reservation.user.username
