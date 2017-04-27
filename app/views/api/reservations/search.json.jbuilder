debugger
x = json.array! @reservations do |reservation|
  debugger
  json.extract! reservation, :id, :time, :date
end
debugger
