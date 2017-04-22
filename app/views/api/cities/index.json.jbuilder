@cities.each do |city|
  json.set! city.id do
    json.extract! city, :city_name, :main_photo
  end
end
