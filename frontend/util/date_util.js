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

const isDate = date => {
  return date instanceof Date;
}
