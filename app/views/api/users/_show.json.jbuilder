json.extract! user, :username, :id
json.reservations user.reservations do |reservation|
    json.res_id reservation.id
    json.reviewed reservation.review ? true : false
    json.extract! reservation, :time, :date, :seats
    json.image reservation.restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(reservation.restaurant.photos.first.image.url)
    json.extract! reservation.restaurant, :id, :restaurant_name, :cuisine, :city_name, :state
end
