@restaurants.each do |restaurant|
  json.set! restaurant.id do
  json.extract! restaurant, :restaurant_name, :id, :city_name, :state
  end
end
