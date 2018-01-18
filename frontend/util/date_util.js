export const getNewDate = date => {
  return date ? new Date(date).toDateString() : new Date().toDateString();
}

export const getNewTime = () => {
  return toUserTime(timeToString(new Date()));
}

export const dateToString = date => {
  return isDate(date) ? date.toLocaleDateString() : new Date(date).toLocaleDateString();
}

export const timeToString = time => {
  return isDate(time) ? time.toLocaleTimeString() : new Date(time).toLocaleTimeString();
}

export const intToTimeString = time => {
  const newTime = time.toString();
  const hour = newTime.slice(0, newTime.length - 2);
  const minutes = newTime.slice(newTime.length - 2);
  const pm = time >= 1200 ? 'PM' : 'AM';

  return `${hour > 11 ? parseInt(hour) - 12 : hour}:${minutes} ${pm}`;
}

export const timeStringToInt = time => {
  return parseInt(ime.split(':').join(''));
}

export const toInputDate = date => {
  let newDate = dateToString(date).split('/');
  newDate = newDate.map(el => parseInt(el) < 10 ? `0${el}` : el);

  return `${newDate[2]}-${newDate[0]}-${newDate[1]}`;
}

export const toUserTime = time => {
  const timeArr = timeToArr(time);
  const hour = time[1] > 30 ? parseInt(time[0]) + 1 : time[0]
  const minutes = time[1] > 30 ? '00' : '30';

  return `${hour}:${minutes} ${timeArr[timeArr.length - 1]}`;
}

export const timeToArr = time => {
  return time.split(' ')
    .reduce((accum, el, idx) => idx === 0
      ? accum.concat(el.split(':'))
      : accum.concat([el])
      , []
    );
}

export const formatHoursMinutes = (hours, minutes) => {
  hours = hours == 0 ? 12 : parseInt(hours)

  return parseInt(minutes) < 29 ? `${hours}:00` : `${hours}:30`;
}

export const genTimeSlots = ({startTime, endTime, minutes}) => {
  let slots = new Array();

  while (startTime < endTime) {
    const hour = startTime > 11 ? startTime - 12 : startTime
    const timeSlot = formatHoursMinutes(hour, minutes);
    const pm = startTime > 11 ? ' PM' : ' AM';
    slots.push(timeSlot + pm);
    minutes = minutes === 0 ? 30 : 0;
    startTime = minutes === 0 ? startTime + 1 : startTime;
  }

  return slots;
}

export const dateToFullString = date => {
  const newObj = new Date(date);

  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September','October', 'November', 'December'];
  return week[newObj.getDay()] + ", " + month[newObj.getMonth()] + " " + newObj.getDate();
}

export const revertDate = (date, time) => {
  const dateArray = date.split('/');
  const timeString = time.toString();

  return new Date(dateArray[2], dateArray[0] - 1, dateArray[1], timeString.slice(0,2) - 1, timeString.slice(2, 4));
}

const isDate = date => {
  return date instanceof Date;
}
