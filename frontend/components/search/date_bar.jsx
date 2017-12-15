import React from 'react'

export default ({ minValue, defaultDate, handleChange }) => {
  const getDefaultDate = () => {
    const date = defaultDate.split('-');
    return `${date[2]}-${date[0]}-${date[1]}`;
  }

  return (
    <input type='date'
      required='required'
      name='date'
      min = { minValue }
      defaultValue={ getDefaultDate() }
      className='input bar-date'
      onChange={ handleChange }
      ></input>
  );
}
