json.extract! user, :username, :id
json.favorites do
  json.array! user.favorites
end
