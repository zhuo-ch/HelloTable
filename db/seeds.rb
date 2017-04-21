# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



a = User.create(username: 'Guest', email: 'guest@guest-email.com', password: 'password')
b = User.create(username: 'zhuo', email: 'aasdf', password: 'password')
c = User.create(username: 'jason', email: 'adsfsdf', password: 'password')
d = User.create(username: 'royce', email: 'sdfsef', password: 'password')
e = User.create(username: 'jeff', email: 'aasdfsdfs', password: 'password')
f = User.create(username: 'corey', email: 'asdff', password: 'password')
m = User.create(username: 'wing', email: 'wing@gmail', password: 'password')


g = Restaurant.create(owner_id: 1, restaurant_name: "Fig and Olive",
  restaurant_number: "2123456789", cuisine: "Meso",
  description: "Nice restaurant", hours: "long",
  site: "some_url", street_address: "12 8th Avenue", city: "New York", state: "NY")

h = Restaurant.create(owner_id: 1, restaurant_name: "Basso",
  restaurant_number: "2123456798", cuisine: "Italian",
  description: "Nicer restaurant", hours: "long",
  site: "some_url", street_address: "414 42nd Street", city: "New York", state: "NY")

i = Restaurant.create(owner_id: 3, restaurant_name: "Amaranth",
  restaurant_number: "2123456777", cuisine: "American",
  description: "Nicest restaurant", hours: "long",
  site: "some_url", street_address: "36 Eldridge Street", city: "New York", state: "NY")

j = Restaurant.create(owner_id: 4, restaurant_name: "Chickalicious",
  restaurant_number: "2123456788", cuisine: "Dessert",
  description: "Neat restaurant", hours: "long",
  site: "some_url", street_address: "111 62nd Street", city: "New York", state: "NY")

k = Restaurant.create(owner_id: 2, restaurant_name: "Brasserie 8.5",
  restaurant_number: "2123456799", cuisine: "American",
  description: "Neater restaurant", hours: "long",
  site: "some_url", street_address: "2024 84th Street", city: "Brooklyn", state: "NY")

l = Restaurant.create(owner_id: 5, restaurant_name: "Great Wall",
  restaurant_number: "2123456768", cuisine: "Chinese",
  description: "Neatest restaurant", hours: "long",
  site: "some_url", street_address: "244 Madison Avenue", city: "New York", state: "NY")
