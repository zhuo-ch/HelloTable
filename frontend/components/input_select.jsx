import React from 'react';

const InputSelect = ({ selecting, targetIdx, handleClick, items, text, listName, type}) => {
  selecting = selecting ? '' : 'hidden';

  const inputs = items.map((item, idx)=> {
    return (
      <li
        className={ targeted(item, targetIdx, type) }
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
      id={ selecting }>
      { inputs }
    </ul>
  );
}

const targeted = (idx, targetIdx, type) => {
  return idx === targetIdx ? `highlight ${ type }` : type;
}

export default InputSelect;
