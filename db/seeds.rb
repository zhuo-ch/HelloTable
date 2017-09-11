# # users
100.times do
  User.create(username: Faker::Name.unique.name,
    email: Faker::Internet.email,
    password: Faker::Internet.password(8,10))
end

# cities

a = City.create(city_name: "New York", state: "NY", latLng: "40.7230025,-74.3059752", image: File.new("app/assets/images/nyc.jpg"))
b = City.create(city_name: "Boston", state: "MA", latLng: "42.3145186,-71.1103692", image: File.new("app/assets/images/boston.jpg"))
c = City.create(city_name: "Los Angeles", state: "CA", latLng: "34.0207305,-118.6919263", image: File.new("app/assets/images/la.jpg"))
d = City.create(city_name: "Seattle", state: "WA", latLng: "47.6131746,-122.4821489", image: File.new("app/assets/images/seattle.jpg"))
e = City.create(city_name: "Houston", state: "TX", latLng: "29.8174782,-95.6814872", image: File.new("app/assets/images/houston.jpg"))
f = City.create(city_name: "Miami", state: "FL", latLng: "25.7825453,-80.2994991", image: File.new("app/assets/images/miami.jpg"))

# restaurants
cuisines = File.open("app/assets/cuisine.txt", "r").readlines.map { |line| line.chomp }
hours = File.open("app/assets/hours.txt").readlines.map { |line| line.chomp.gsub("\t", " ") }
descriptions = File.open("app/assets/descriptions.txt").readlines.map { |line| line.chomp }
users = User.all.map { |user| user.id }

def generate_restaurant(restaurant, city_id, cuisines, hours, descriptions, users)
  Restaurant.create(
    owner_id: users.sample,
    city_id: city_id,
    restaurant_name: restaurant["name"],
    restaurant_number: Faker::Number.number(10),
    cuisine: cuisines.sample,
    hours: hours.sample,
    site: Faker::Internet.domain_name,
    description: descriptions.sample,
    address: restaurant["formatted_address"],
    location: restaurant["geometry"]["location"]
    )
end

def generate_city_restaurants(city, cuisines, hours, descriptions, users)
  page_token = ""
  idx = 0

  while idx < 3 do
    response = ""
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"

    if page_token != ""
      response = RestClient::Request.execute(
      method: :get,
      url: "#{url}pagetoken=#{page_token}&key=#{ENV['google_places_key']}",
      headers: {key: "#{ENV['google_places_key']}"}
      )
    else
      response = RestClient::Request.execute(
      method: :get,
      url: "#{url}location=#{city.latLng}&type=restaurant&minprice=2&key=#{ENV['google_places_key']}"
      )
    end

    response = JSON.parse(response)
    page_token = response["next_page_token"]
    idx += 1
    response["results"].each { |res| generate_restaurant(res, city.id, cuisines, hours, descriptions, users)}
    sleep(3)
  end
end

City.all.each { |city| generate_city_restaurants(city, cuisines, hours, descriptions, users)}


# photos

photos = Dir["app/assets/images/*"]

Restaurant.all.each do |res|
  6.times do
    Photo.create(restaurant_id: res.id, image: File.new(photos.sample))
  end
end

# reservations

times = [500, 530, 600, 630, 700, 730, 800, 830, 900]

Restaurant.all.each do |restaurant|
  15.times do
    Reservation.create(user_id: users.sample, restaurant_id: restaurant.id,
      date: "#{rand(8..9)}-#{rand(1..28)}-2017", time: times.sample, seats: rand(1..6))
  end
end

# reviews

reviews = File.open("app/assets/reviews.txt", "r").readlines.map { |line| line.chomp }

Reservation.all.each do |reservation|
  def get_rating
    (rand(1..5) + rand(2..5) + rand(3..5))/3
  end

  Review.create(reservation: reservation, rating: get_rating, food: get_rating, service: get_rating,
    ambiance: get_rating, value: get_rating, details: reviews.sample)
end

# guest

guest = User.create(username: 'Guest', email: 'guest@guest-email.com', password: 'password')

5.times do
  Reservation.create(user_id: a.id, restaurant_id: Restaurant.all.sample.id,
    date: "#{rand(1..6)}-" + "#{rand(1..28)}" + "-2017", time: times.sample, seats: rand(6))
end

guest.reservations.each do |reservation|
  Review.create(reservation: reservation, rating: rand(1..5), food: rand(1..5), service: rand(1..5),
    ambiance: rand(1..5), value: rand(1..5), details: reviews.sample)
end

5.times do
  Reservation.create(user_id: a.id, restaurant_id: Restaurant.all.sample.id,
    date: "#{rand(8..9)}-" + "#{rand(1..30)}" + "-2017", time: times.sample, seats: rand(6))
end

5.times do |user|
  Favorite.create(user_id: a.id, restaurant_id: Restaurant.all.sample.id)
end
