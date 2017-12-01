import React from 'react';

export const fillList = list => {
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
debugger
  return newList;
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
