json.extract! user, :username, :id
json.favorites do
  json.array! user.favorites
end
json.reservations user.reservations do |reservation|
    json.res_id reservation.id
    json.reviewed reservation.review ? true : false
    json.extract! reservation, :time, :date, :seats
    json.restaurant do
      json.image reservation.restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(reservation.restaurant.photos.first.image.url)
      json.extract! reservation.restaurant, :id, :restaurant_name, :cuisine, :city_name, :state
      json.ratings do
        json.extract! reservation.restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
        json.details reservation.restaurant.reviews.sample.details
      end
    end
end
