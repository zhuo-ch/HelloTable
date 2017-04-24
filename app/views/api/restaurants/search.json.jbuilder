@restaurants.each do |restaurant|
  json.extract! restaurant, :restaurant_name, :id
end
