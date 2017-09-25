export const fetchMapData = address => {
  return $.ajax({
    method: 'GET',
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  });
}

export const parseAddress = restaurant => {
  const street = parseLine(restaurant.street_address);
  const city = parseLine(restaurant.name);

  return `${street},+${city},+${restaurant.state}`;
}

const parseLine = line => line.split(' ').join('+');
