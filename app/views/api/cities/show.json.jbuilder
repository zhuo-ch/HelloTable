json.id @city.id
json.city_name @city.city_name
json.image_url asset_path(@city.image.url)
json.restaurants @city.restaurants.map do |restaurant|
    json.extract! restaurant, :id, :restaurant_name, :cuisine, :city_name, :state
    json.ratings do
      json.extract! restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
      if restaurant.reviews.count > 0
        json.details restaurant.reviews[rand(restaurant.reviews.count)].details
      end
    end
    json.image restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(restaurant.photos.first.image.url)
end
