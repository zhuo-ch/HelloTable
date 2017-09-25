json.id @reservation.id
json.time @reservation.time
json.date @reservation.date
json.name @reservation.restaurant.name
json.username @reservation.user.username
json.seats @reservation.seats
json.res_id @reservation.id
json.reviewed @reservation.review ? true : false
