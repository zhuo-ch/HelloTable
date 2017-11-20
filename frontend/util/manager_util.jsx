import React from 'react';

export const to24 = time => {
  const type = (time.match(/\D+/g)[1]).toLowerCase();
  let hoursMins = parseInt(time.match(/\d+/g).join(''));

  if (type === 'pm') {
    hoursMins += 1200;
  }

  return hoursMins;
}

export const createButton = (text, handler) => {
  return (
      <button className='button' onClick={ handler }>{ text }</button>
  );
}

export const createSpan = ({key, cName, text, clickHandler}) => {
  return (
    <span
      onClick={ clickHandler }
      key={ key }
      id={ key }
      className={ cName }>
      { text }
    </span>
  );
}

export const createInput = ({key, cName, changeHandler, placeHolder}) => {
  return (
    <input
      onChange={ changeHandler }
      key={ key }
      id={ key }
      className={ cName }
      placeholder={ placeHolder }>
    </input>
  );
}

export const createSection = ({ id, title, liElements, }) => {
  return (
    <section
      className='restaurant-about about-text'
      id={ id }>
      <article className='user-show-res-header'>
        <h2>{ title }</h2>
      </article>
      <ul>
        { liElements }
      </ul>
    </section>
  );
}

export const getBlankArticle = (cName) => {
  return <article className={ cName }></article>;
}

export const getEditButtons = ({ onSave, onCancel, cName }) => {
  return (
    <article className={ cName }>
      { createButton('Save', onSave) }
      { createButton('Cancel', onCancel)}
    </article>
  )
}

export const getTimesList = () => {
  const list = { '12:00AM': 0, '12:30AM': 30 };
  let hours = 100;
  let mins = 0;

  while (hours < 2400) {
    const str = hours.toString();
    const hour = str.slice(0, -2);
    const min = str.slice(-2, str.length);
    const type = hours > 11 ? 'PM' : 'AM';
    list[`${hour}:${min}${type}`] = hours + min;
    mins = mins === 30 ? 0 : 30;
  }

  return list;
}
