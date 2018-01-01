# @restaurants.each do |restaurant|
#   json.set! restaurant.id do
#     json.extract! restaurant, :id, :name, :cuisine, :address, :location
#     json.ratings restaurant.rating, :rating, :value
#     json.sample restaurant.reviews[restaurant.reviews.length], :details
#     json.image asset_path(restaurant.photos.first.image.url)
#   end
# end

count = @restaurants.count
json.extract! @params, :page, :per_page
json.pages @params[:pages].nil? ? count / @params[:per_page].to_i + (count % @params[:per_page].to_i > 0 ? 1 : 0) : @params[:pages]
json.restaurants @restaurants.map do |restaurant|
    json.extract! restaurant, :id, :name, :cuisine, :address, :location
    json.ratings do
      json.extract! restaurant.rating, :total, :rating, :food, :service, :ambiance, :value
      if restaurant.reviews.count > 0
        json.details restaurant.reviews[rand(restaurant.reviews.count)].details
      end
    end
    json.image restaurant.photos.first.nil? ? asset_path(City.first.image.url) : asset_path(restaurant.photos.first.image.url)
end
