debugger
@seatings.each do |seating|
  json.set! seating.id do
    json.extract! seating, :id, :seats, :max_tables
  end
end
