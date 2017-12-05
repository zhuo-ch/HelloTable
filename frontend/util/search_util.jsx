import React from 'react';

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

export const getSeatsObj = (searchParams, seatings) => {
  let seats = searchParams.seats;
  let item = seatings.find(el => el.seats === seats);

  while (!item && seats < searchParams.seats + 3) {
    seats += 1
    item = seatings.find(el => el.seats === seats);
  }

  return item;
}

export const getClosestSeating = (seatings, params) => {
  let seats = params.seats;
  let item = seatings.find(el => el.seats === seats);
  let idx = 0;
  let toggle = 1;

  while(!item) {
    item = seatings.find(el => el.seats === seats + (idx * toggle));
    idx = toggle === Math.abs(toggle) ? idx + 1 : idx;
    toggle = toggle === Math.abs(toggle) ? -1 : 1;
  }

  return item.seats;
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
