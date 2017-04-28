

json.extract! user, :username, :id
# json.username user.username
# json.id user.id
# json.reservations user.reservations.map do |reservation|
#   json.id reservation.id
#   json.extract! reservation.restaurant, :id, :restaurant_name, :cuisine, :city_name, :state
#   json.image reservation.restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(restaurant.photos.first.image.url)
# end
#
# json.reservations @user.reservations, :id, :seats, :time, :date, :restaurant_id
# json.restaurants @user.reservations do |reservation|
#   json.extract! reservation.restaurant, :id, :restaurant_name, :city_name, :cuisine, :city_name, :state
# end
