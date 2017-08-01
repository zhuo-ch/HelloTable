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
