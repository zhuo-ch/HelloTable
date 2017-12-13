# users

user = User.create(username: Faker::Name.unique.name,
  email: Faker::Internet.email,
  password: Faker::Internet.password(8,10)).id

# cities

a = City.create(name: "New York", state: "NY", lat: 40.730610, lng: -73.935242, image: File.new("app/assets/images/nyc.jpg"))
b = City.create(name: "Boston", state: "MA", lat: 42.361145, lng: -71.057083, image: File.new("app/assets/images/boston.jpg"))
c = City.create(name: "Los Angeles", state: "CA", lat: 34.052235, lng: -118.243683, image: File.new("app/assets/images/la.jpg"))
d = City.create(name: "Seattle", state: "WA", lat: 47.608013, lng: -122.335167, image: File.new("app/assets/images/seattle.jpg"))
e = City.create(name: "Houston", state: "TX", lat: 29.761993, lng: -95.366302, image: File.new("app/assets/images/houston.jpg"))
f = City.create(name: "Miami", state: "FL", lat: 25.761681, lng: -80.191788, image: File.new("app/assets/images/miami.jpg"))

# restaurants

cuisines = File.open("app/assets/cuisine.txt", "r").readlines.map { |line| line.chomp }
descriptions = File.open("app/assets/descriptions.txt").readlines.map { |line| line.chomp }


def generate_hours(id)
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  hours = [1000, 1030, 1100, 1130]

  days.each { |day| Hour.create(day: day, open: hours.sample, close: hours.sample + 1200, restaurant_id: id) }
end

def generate_seating(id)
  tables = (1..10).to_a

  (rand(3) + 1).times do
    seats = tables.sample
    tables.delete(seats)
    Seating.create(seats: seats, max_tables: 1, restaurant_id: id)
  end
end

def generate_restaurant(restaurant, city_id, cuisines, descriptions, user)

  res = Restaurant.create(
    user_id: user,
    city_id: city_id,
    name: restaurant["name"],
    phone: Faker::Number.number(10),
    cuisine: cuisines.sample,
    site: Faker::Internet.domain_name,
    description: descriptions.sample,
    address: restaurant["formatted_address"],
    location: restaurant["geometry"]["location"]
    )

  generate_hours(res.id)
  generate_seating(res.id)

  res
end

def generate_city_restaurants(city, cuisines, descriptions, user)
  page_token = ""
  idx = 0

  while idx < 3 do
    response = ""
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"

    if page_token != ""
      response = RestClient::Request.execute(
      method: :get,
      url: "#{url}pagetoken=#{page_token}&key=#{ENV["google_places_key"]}",
      headers: {key: "#{ENV["google_places_key"]}"}
      )
    else
      response = RestClient::Request.execute(
      method: :get,
      url: "#{url}location=#{city.lat},#{city.lng}&type=restaurant&minprice=2&key=#{ENV["google_places_key"]}"
      )
    end

    response = JSON.parse(response)
    page_token = response["next_page_token"]
    idx += 1
    response["results"].each { |res| generate_restaurant(res, city.id, cuisines, descriptions, user)}
    sleep 3
  end
end

City.all.each { |city| generate_city_restaurants(city, cuisines, descriptions, user)}

# set Guest, Guest restaurant, variables for reservations

photos = Dir["app/assets/images/*"]
times = [500, 530, 600, 630, 700, 730, 800, 830, 900]
reviews = File.open("app/assets/reviews.txt", "r").readlines.map { |line| line.chomp }

guest = User.create(username: 'Guest', email: 'guest@guest-email.com', password: 'password')
guest_res = { "formatted_address" => '234 W 56th St, New York, NY 10019', "geometry" => { "location" => "40.7655401,-73.9848306" }, "name" => 'Basso 56' }
generate_restaurant(guest_res, a.id, cuisines, descriptions, guest.id)
restaurants = Restaurant.all.map { |res| res.id }

# set initial Guest reservations and favorites

3.times do
  id = restaurants.sample
  seating = Restaurant.find(id).seatings.sample
  Reservation.create(user_id: guest.id, restaurant_id: id,
    date: "#{rand(3..11)}-" + "#{rand(1..30)}" + "-2017", time: times.sample, seating_id: seating.id, seats: seating.seats)
end

5.times do |user|
  Favorite.create(user_id: guest.id, restaurant_id: restaurants.sample)
end

# photos

Restaurant.all.each do |res|
  6.times do
    Photo.create(restaurant_id: res.id, image: File.new(photos.sample))
  end
end

# reservations

Restaurant.all.each do |restaurant|
  available_seats = restaurant.seatings.map { |seating| seating }
  8.times do
    seating = available_seats.sample
    Reservation.create(user_id: user, restaurant_id: restaurant.id,
      date: "#{12}-#{rand(1..30)}-2017", time: times.sample + 12, seating_id: seating.id, seats: seating.seats)
  end
end

# reviews

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

# set reviewable reservations and upcoming reservations for Guest

3.times do
  id = restaurants.sample
  seating = Restaurant.find(id).seatings.sample
  Reservation.create(user_id: guest.id, restaurant_id: id,
    date: "#{rand(3..11)}-" + "#{rand(1..30)}" + "-2017", time: times.sample + 12,
    seating_id: seating.id, seats: seating.seats)
end

# set upcoming reservations

30.times do |i|
  seating = Restaurant.last.seatings.sample
  Reservation.create(user_id: user, restaurant_id: Restaurant.last.id,
    date: "12-#{i + 1}-2017", time: times.sample + 12, seating_id: seating.id,
    seats: seating.seats)
end

5.times do
  id = restaurants.sample
  seating = Restaurant.find(id).seatings.sample
  Reservation.create(user_id: guest.id, restaurant_id: id,
    date: "#{12}-" + "#{rand(1..30)}" + "-2017", time: times.sample + 12, seating_id: seating.id, seats: seating.seats)
end
