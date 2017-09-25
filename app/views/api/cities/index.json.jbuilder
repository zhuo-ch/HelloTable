@cities.each do |city|
  json.set! city.id do
    json.id city.id
    json.name city.name
    json.image_url asset_path(city.image.url)
  end
end
