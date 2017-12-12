@reservations do |reservation|
  json.extract! reservation, :id, :time, :seats
  json.client reservation.user.username
end
