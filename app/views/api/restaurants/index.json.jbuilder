json.extract! @restaurants do |restaurant|
debugger
  json.extract! restaurant, :id, :restaurant_name, :city, :cuisine
end
