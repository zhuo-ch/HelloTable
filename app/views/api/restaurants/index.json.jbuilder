@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.extract! restaurant, :id, :name, :cuisine, :address, :location
    json.ratings restaurant.rating, :rating, :value
    json.sample restaurant.reviews[restaurant.reviews.length], :details
    json.image asset_path(restaurant.photos.first.image.url)
  end
end

count = @restaurants.count
json.extract! @city, :id, :name, :page, :per_page
json.pages count / @city.per_page.to_i + (count % @city.per_page.to_i > 0 ? 1 : 0)
json.image_url asset_path(@city.image.url)
json.restaurants @city.restaurants.map do |restaurant|
    json.extract! restaurant, :id, :name, :cuisine, :address, :location
    json.ratings do
      json.extract! restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
      if restaurant.reviews.count > 0
        json.details restaurant.reviews[rand(restaurant.reviews.count)].details
      end
    end
    json.image restaurant.photos.first.nil? ? asset_path(@city.image.url) : asset_path(restaurant.photos.first.image.url)
end
