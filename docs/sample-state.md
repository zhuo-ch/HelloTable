{
  currentUser: {
    id: userId,
    username: first name,
  }
  forms: {
    signUp: { errors: []},
    signIn: { errors: []},
    review: { errors: []},
  }
  restaurants: {
    id: {
      owner_id: id of owner,
      name: restaurant name,
      about: {
        style: type of dining,
        description: about text,
        hours: hours of operation,
        phone: restaurant phone number,
        siteLink: link to restaurant website,
      }
      location: (tentatively geolocation),
      photos: urls for photos,
    }
  }
  reservations: {
    id: {
      user: belongs to user,
      restaurant: belongs to restaurant,
      time: time,
      date: date,
    }
  }
  reviews: {
    id: {
      rating: {
        total: overall rating,
        food: food score,
        service: service score,
        ambiance: ambiance score,
        value: value score,
        noise: noise score,
      }
      date: user reservation date,
      location: user location,
      restaurant: restaurant_id,
    }
  }
  favorites: {
    restaurant: restaurant_id,
  }
}
