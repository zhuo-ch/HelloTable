# users
# 100.times do
#   User.create(username: Faker::Name.unique.name,
#     email: Faker::Internet.email,
#     password: Faker::Internet.password(8,10))
# end

# cities

a = City.create(name: "New York", state: "NY", lat: 40.730610, lng: -73.935242, image: File.new("app/assets/images/nyc.jpg"))
b = City.create(name: "Boston", state: "MA", lat: 42.361145, lng: -71.057083, image: File.new("app/assets/images/boston.jpg"))
c = City.create(name: "Los Angeles", state: "CA", lat: 34.052235, lng: -118.243683, image: File.new("app/assets/images/la.jpg"))
d = City.create(name: "Seattle", state: "WA", lat: 47.608013, lng: -122.335167, image: File.new("app/assets/images/seattle.jpg"))
e = City.create(name: "Houston", state: "TX", lat: 29.761993, lng: -95.366302, image: File.new("app/assets/images/houston.jpg"))
f = City.create(name: "Miami", state: "FL", lat: 25.761681, lng: -80.191788, image: File.new("app/assets/images/miami.jpg"))

# restaurants
cuisines = File.open("app/assets/cuisine.txt", "r").readlines.map { |line| line.chomp }
hours = File.open("app/assets/hours.txt").readlines.map { |line| line.chomp.gsub("\t", " ") }
descriptions = File.open("app/assets/descriptions.txt").readlines.map { |line| line.chomp }
users = User.all.map { |user| user.id }

def generate_restaurant(restaurant, city_id, cuisines, hours, descriptions, users)
  Restaurant.create(
    owner_id: users.sample,
    city_id: city_id,
    name: restaurant["name"],
    phone: Faker::Number.number(10),
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
      url: "#{url}location=#{city.lat},#{city.lng}&type=restaurant&minprice=2&key=#{ENV['google_places_key']}"
      )
    end
    response = JSON.parse(response)
    page_token = response["next_page_token"]
    idx += 1
    debugger
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
      date: "#{rand(9..10)}-#{rand(1..28)}-2017", time: times.sample, seats: rand(1..6))
  end
end

# reviews

reviews = File.open("app/assets/reviews.txt", "r").readlines.map { |line| line.chomp }

Reservation.all.each do |reservation|
  def get_rating
    rand_range = rand(100)
    case rand_range
      when 0..40
        rand(1..5)
      when 41..60
        rand(2..5)
      when 61..100
        rand(3..5)
      else
        rand(1..5)
      end
  end

  Review.create(reservation: reservation, rating: get_rating, food: get_rating, service: get_rating,
    ambiance: get_rating, value: get_rating, details: reviews.sample)
end

# guest

guest = User.create(username: 'Guest', email: 'guest@guest-email.com', password: 'password')
restaurants = Restaurant.all.map { |res| res.id }

3.times do
  Reservation.create(user_id: guest.id, restaurant_id: restaurants.sample,
    date: "#{rand(1..8)}-" + "#{rand(1..28)}" + "-2017", time: times.sample, seats: rand(6))
end

guest.reservations.each do |reservation|
  Review.create(reservation: reservation, rating: rand(1..5), food: rand(1..5), service: rand(1..5),
    ambiance: rand(1..5), value: rand(1..5), details: reviews.sample)
end

3.times do
  Reservation.create(user_id: guest.id, restaurant_id: restaurants.sample,
    date: "#{rand(1..8)}-" + "#{rand(1..28)}" + "-2017", time: times.sample, seats: rand(6))
end

5.times do
  Reservation.create(user_id: guest.id, restaurant_id: restaurants.sample,
    date: "#{rand(8..9)}-" + "#{rand(1..30)}" + "-2017", time: times.sample, seats: rand(6))
end

5.times do |user|
  Favorite.create(user_id: guest.id, restaurant_id: restaurants.sample)
end
