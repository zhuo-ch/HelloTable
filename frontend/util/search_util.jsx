import React from 'react';
import { merge } from 'lodash';

export const fillList = list => {
  list = list.sort((a, b) => a - b);
  const newList = [];

  for (let i = list.length - 1; i > -1; i--) {
    const curr = list[i];
    const next = list[i -1 ] ? list[i - 1] : 0;
    newList.unshift(curr);
    if (next < curr - 2) {
      newList.unshift(curr - 1);
      newList.unshift(curr - 2);
    } else if (next < curr - 1) {
      newList.unshift(curr - 1);
    }
  }

  return newList;
}

export const getClosestSeating = (seatings, params) => {
  const max = seatings.reduce((accum, val) => accum > val.seats ? accum : val.seats, 0);
  let seats = params.seats;
  let item = seatings.find(el => el.seats === seats);
  let idx = 0;
  let toggle = 1;

  while(!item && idx <= max) {
    item = seatings.find(el => el.seats === seats + (idx * toggle));
    idx = toggle === Math.abs(toggle) ? idx + 1 : idx;
    toggle = toggle === Math.abs(toggle) ? -1 : 1;
  }

  if (item.seats > seats && item.seats - seats < 3) {
    item = merge({}, item, { seats });
  }

  return item.seats;
}

export const getSeatsObj = (searchParams, seatings) => {
  const max = seatings.reduce((accum, val) => accum > val.seats ? accum : val.seats, 0);
  let seats = searchParams.seats;
  let item = seatings.find(el => el.seats === seats);

  while (!item && seats < max) {
    seats += 1
    item = seatings.find(el => el.seats === seats);
  }

  return item ? item : getClosestSeating(seatings, searchParams);
}

export const inputSelect = ({ selecting, targetIdx, handleClick, items, text, listName, type}) => {
  const listId = selecting ? '' : 'hidden';

  const inputs = items.map((item, idx)=> {
    return (
      <li
        className={ targeted(idx, targetIdx, type) }
        key={ item }
        value={ item }
        onClick={ handleClick }>
        { item } { text }
      </li>
    );
  });

  return (
    <ul
      className={ listName.map(el => el + '-list').join(' ') }
      id={ listId }>
      { inputs }
    </ul>
  );
}

const targeted = (idx, targetIdx, type) => {
  return idx === targetIdx ? `highlight ${ type }` : type;
}


export const formatDate = (date) => {
  date = date ? date : new Date();
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

export const getNewDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const formatMinutes = (minute) => {
  if (minute === 0) {
    return '00';
  } else {
    return '30';
  }
}
