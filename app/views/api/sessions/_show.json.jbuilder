json.extract! user, :username, :id

json.favorites do
  json.array! user.favorites do |favorite|
    json.extract! favorite, :id, :user_id, :restaurant_id
    json.set! :restaurant do
      json.image favorite.restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(favorite.restaurant.photos.first.image.url)
      json.extract! favorite.restaurant, :id, :name, :cuisine, :address, :location
      json.ratings do
        json.extract! favorite.restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
        json.details favorite.restaurant.reviews.sample.details
      end
    end
  end
end

json.reservations user.reservations do |reservation|
    json.id reservation.id
    json.reviewed reservation.review ? true : false
    json.extract! reservation, :time, :date, :seats
    json.restaurant do
      json.image reservation.restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(reservation.restaurant.photos.first.image.url)
      json.extract! reservation.restaurant, :id, :name, :cuisine, :address, :location
      json.ratings do
        json.extract! reservation.restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
        json.details reservation.restaurant.reviews.sample.details
      end
    end
  end
