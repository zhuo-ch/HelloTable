@cities.each do |city|
  json.set! city.id do
    json.id city.id
    json.city_name city.city_name
    json.image_url asset_path(city.image.url)
  end
end
