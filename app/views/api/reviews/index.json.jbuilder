debugger
json.array! @reviews do |review|
  json.extract review, :id, :reservation_id, :rating, :details, :food, :service, :ambiance, :value
end
