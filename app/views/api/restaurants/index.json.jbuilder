
@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.extract! restaurant, :id, :restaurant_name, :city, :cuisine, :state
    json.image asset_path(restaurant.photos.first.image.url)
  end
end
