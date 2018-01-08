json.extract! user, :username, :id
json.manager user.restaurant ? user.restaurant.id : false
json.favorites user.favorites do |favorite|
    json.extract! favorite.restaurant, :id, :name
end
json.reservations user.reservations do |reservation|
  json.extract! reservation, :time, :date, :seats
  json.extract! reservation.restaurant, :id, :name
end
