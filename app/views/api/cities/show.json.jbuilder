json.id @city.id
json.city_name @city.city_name
json.image_url asset_path(@city.image.url)
json.restaurants @city.restaurants.map do |restaurant|
    json.extract! restaurant, :id, :restaurant_name, :cuisine, :city_name, :state
    json.image restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(restaurant.photos.first.image.url)
end
