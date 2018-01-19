import * as DateUtil from '../util/date_util';

export const setUpcoming = reservation => {
  const curDate = new Date();
  const newDate = new Date(reservation.date + ' ' + DateUtil.timeToString(reservation.time));

  return newDate > curDate;
}
