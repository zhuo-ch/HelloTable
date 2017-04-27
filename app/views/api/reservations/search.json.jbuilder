json.array! @reservations do |reservation|
  json.extract! reservation, :id, :time, :date
end
