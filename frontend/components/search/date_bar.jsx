import React from 'react'

export default ({ minValue, defaultDate, handleChange }) => {
  return (
    <input type='date'
      required='required'
      name='date'
      min = { minValue ? minValue : '' }
      defaultValue={ defaultDate }
      className='input bar-date'
      onChange={ handleChange }
      ></input>
  );
}
