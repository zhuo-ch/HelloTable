@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.extract! restaurant, :id, :name, :cuisine, :address, :location
    json.ratings restaurant.rating, :rating, :value
    json.sample restaurant.reviews[restaurant.reviews.length], :details
    json.image asset_path(restaurant.photos.first.image.url)
  end
end
