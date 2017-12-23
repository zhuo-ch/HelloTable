json.extract! user, :username, :id
json.manager user.restaurant ? user.restaurant.id : false
json.favorites do
  json.array! user.favorites do |favorite|
    json.partial! 'api/favorites/show.json.jbuilder', favorite: favorite
  end
end

json.reservations user.reservations do |reservation|
  json.partial! 'api/reservations/show.json.jbuilder', reservation: reservation
end
