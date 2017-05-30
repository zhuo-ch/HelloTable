export const searchRestaurants = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/restaurants/search',
    data: {query},
  })
}

export const findRestaurants = (query) => {
  return $.ajax({
    method: 'GET',
    url: 'api/restaurants/search',
    data: {query},
  })
}

export const formatDate = (newDate) => {
    const date = new Date();
    let currentDate = newDate ? newDate : `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
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

export const formateTime = (newTime) => {

}
