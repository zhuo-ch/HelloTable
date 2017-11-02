export const searchRestaurants = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/restaurants/search',
    data: {query},
  })
}

export const formatDate = (date) => {
    let currentDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;

    return (
      currentDate.split("-").map((num) => {
        if (parseInt(num) < 10) {
          return "0"+num;
        } else {
          return num;
        }
      }).join('-')
    );
  }

export const getNewTime = () => {
  const date = new Date();
  const hours = date.getHours() > 19 ? date.getHours()%12 : 7;
  return formatTime(hours, date.getMinutes());
}

export const formatHoursMinutes = (time) => {
  const str = time.toString();
  const hour = str.slice(0, -2);
  const am = parseInt(hour) < 12;
  const minutes = str.slice(-2, str.length);

  return am ? `${hour}:${minutes}AM` : `${hour - 12}:${minutes}PM`;
}

export const formatTime = (hours, minutes) => {
  return hours.toString()+":"+formatMinutes(minutes);
}

const formatMinutes = (minute) => {
  if (minute === 0) {
    return '00';
  } else {
    return '30';
  }
}
