json.id @city.id
json.city_name @city.city_name
json.image_url asset_path(@city.image.url)
debugger
json.restaurants @city.restaurants.map do |restaurant|
    json.extract! restaurant, :id, :restaurant_name, :cuisine, :city_name, :state
    json.image asset_path(restaurant.photos.first.image.url)
end
