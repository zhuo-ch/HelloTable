export const getNewDate = () => {
  return new Date().toDateString();
}

export const getNewTime = () => {
  return new Date().toTimeString();
}

export const dateToString = date => {
  return isDate(date) ? date.toLocaleDateString() : new Date(date).toLocaleDateString();
}

export const timeToString = time => {
  return isDate(date) ? time.toLocaleTimeString() : new Date(date).toLocaleTimeString();
}

export const toInputDate = date => {
  let newDate = dateToString(date).split('/');
  newDate = newDate.map(el => parseInt(el) < 10 ? `0${el}` : el);

  return `${newDate[2]}-${newDate[0]}-${newDate[1]}`;
}

export const toUserTime = time => {
  const timeArr = time.split(' ')
    .reduce((accum, el, idx) => idx > 0
      ? accum.concat(el.split(':'))
      : accum.concat([el])
      , []
    );

  return `${timeArr[0] > 12 ? timeArr[0] - 12 : timeArr[0]} : ${formatMinutes(timeArr[1])}`;
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

const isDate = date => {
  return date instanceof Date;
}
