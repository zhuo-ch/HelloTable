import * as DateUtil from '../util/date_util';

export const setUpcoming = reservation => {
  const curDate = new Date();
  const newDate = new Date(reservation.date + ' ' + timeToString(reservation.time));

  return newDate > curDate;
}

function makeChange(val, coins) {
    return coins.map((el, idx) => {
        if (val - el < 0) {
            return 0;
        } else if (val - el === 0) {
            return 1;
        } else {
            return makeChange(val - el, coins.slice(idx)).reduce((accum, a) => accum + a, 0);
        }
    });
}
