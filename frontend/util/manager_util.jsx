import React from 'react';

export const to24 = time => {
  if (valid24(time)) {
    const type = (time.match(/\D+/g)[1]).toLowerCase();
    let hoursMins = parseInt(time.match(/\d+/g).join(''));

    if (type === 'pm') {
      hoursMins = parseInt(hoursMins);
      hoursMins += 1200;
    }

    return hoursMins;
  } else {
    return false;
  }
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

export const createSection = ({ id, title, liElements, titleAddon, errors }) => {
  return (
    <section
      className='restaurant-about about-text'
      id={ id }>
      <article className='user-show-res-header horizontal'>
        <h2>{ title }</h2>
        { titleAddon }
      </article>
      <article className='horizontal errors'>{ errors }</article>
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

const valid24 = num => {
  num = num.split(':');

  if (num.length < 2 || num[0].length > 2 || num[1].length > 4) {
    return false;
  } else {
    const mins = num[1].slice(0, 2);
    const type = num[1].slice(2, num[1].length);
    const time = new Date();
    time.setHours(num[0]);
    time.setMinutes(mins);

    if (isNaN(time.getTime())) {
      return false;
    } else if (type.toLowerCase() === 'am' || type.toLowerCase() === 'pm') {
      return true;
    }
  }
}
