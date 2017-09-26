@reservations.each do |reservation|
  json.set! reservation.id do
    json.extract! reservation, :id, :time, :date
  end
end
