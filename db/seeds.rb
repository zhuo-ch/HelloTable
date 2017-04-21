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
  restaurant_number: "2123456789", cuisine: "Meso", description: "Nice restaurant", hours: "long", site: "some_url", location: "meatpacking")

h = Restaurant.create(owner_id: 1, restaurant_name: "Basso",
  restaurant_number: "2123456798", cuisine: "Italian", description: "Nicer restaurant", hours: "long", site: "some_url", location: "upper east")

i = Restaurant.create(owner_id: 3, restaurant_name: "Amaranth",
  restaurant_number: "2123456777", cuisine: "American", description: "Nicest restaurant", hours: "long", site: "some_url", location: "lower east")

j = Restaurant.create(owner_id: 4, restaurant_name: "Chickalicious",
  restaurant_number: "2123456788", cuisine: "Dessert", description: "Neat restaurant", hours: "long", site: "some_url", location: "upper west")

k = Restaurant.create(owner_id: 2, restaurant_name: "Brasserie 8.5",
  restaurant_number: "2123456799", cuisine: "American", description: "Neater restaurant", hours: "long", site: "some_url", location: "lower west")

l = Restaurant.create(owner_id: 5, restaurant_name: "Great Wall",
  restaurant_number: "2123456768", cuisine: "Chinese", description: "Neatest restaurant", hours: "long", site: "some_url", location: "soho")
