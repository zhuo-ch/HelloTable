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
