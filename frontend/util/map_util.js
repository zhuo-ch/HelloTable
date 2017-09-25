export const fetchMapData = address => {
  return $.ajax({
    method: 'GET',
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  });
}

export const parseAddress = address => {
  address = address.split(',');
  const street = address[0];
  const city = [address[1], address[2]].join(', ');
  const country = address[3];

  return { street, city, country };
}

const parseLine = line => line.split(' ').join('+');
