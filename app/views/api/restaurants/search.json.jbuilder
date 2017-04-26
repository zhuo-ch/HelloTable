json.cities @cities.each do |city|
  json.extract! city, :city_name, :id, :state
end
json.restaurants @restaurants.each do |restaurant|
  json.set! restaurant.id do
  json.extract! restaurant, :restaurant_name, :id, :city_name, :state
  end
end
