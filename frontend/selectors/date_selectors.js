export const formatDate = date => {
  const newDate = date.split('-');

  const newObj = new Date(newDate[2], parseInt(newDate[0])-1, newDate[1]);
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September','October', 'November', 'December'];
  return week[newObj.getDay()] + ", " + month[newObj.getMonth()] + " " + newObj.getDate();
}

export const formatTime = time => {
  const newTime = time.toString();
  return newTime.slice(0, newTime.length-2) + ":" + newTime.slice(newTime.length-2, newTime.length);
}

export const revertDate = (date, time) => {
  const dateArray = date.split('-');
  const timeString = (time + 1200).toString();

  return new Date(dateArray[2], dateArray[0] - 1, dateArray[1], timeString.slice(0,2) - 1, timeString.slice(2, 4));
}
