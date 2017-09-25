json.cities @cities.each do |city|
  json.extract! city, :name, :id, :state
end
json.restaurants @restaurants.each do |restaurant|
  json.set! restaurant.id do
  json.extract! restaurant, :restaurant_name, :id, :name, :address, :location
  end
end
