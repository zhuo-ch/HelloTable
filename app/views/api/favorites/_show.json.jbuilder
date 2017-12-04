json.extract! favorite, :id, :user_id, :restaurant_id
json.restaurant do
  json.image favorite.restaurant.photos.first.nil? ? asset_path(favorite.restaurant.city.image.url) : asset_path(favorite.restaurant.photos.first.image.url)
  json.extract! favorite.restaurant, :id, :name, :cuisine, :address, :location
  json.ratings do
    json.extract! favorite.restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
    json.details favorite.restaurant.reviews.first.nil? ? "Be the first to review!" : favorite.restaurant.reviews.sample.details
  end
end
