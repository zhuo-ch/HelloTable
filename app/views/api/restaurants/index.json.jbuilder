json.extract! @params, :pages, :page, :per_page, :filter, :id
json.restaurants @restaurants.map do |restaurant|
    json.extract! restaurant, :id, :name, :cuisine, :address, :location
    json.ratings do
      json.extract! restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
      if !restaurant.sample_review.nil?
        json.details restaurant.sample_review.first.details
      end
    end
    json.image restaurant.photos.first.nil? ? asset_path(City.first.image.url) : asset_path(restaurant.photos.first.image.url)
end
