
@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.extract! restaurant, :id, :restaurant_name, :city, :cuisine
  end
end
