import React from 'react';
import { Link } from 'react-router';

const TimeBar = () => {
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (date.getMinutes() < 30) {
    minute = 30;
  } else {
    hour += 1;
  }

  let slots = [];

  for (hour; hour < 24 ;) {
    let min = '00'

    if (hour > 12) {
      if (minute === 0) {
        slots.push(`${hour}`)
      }
      slots.push(`${hour%12}:${minute}`);
    } else {
      slots.push(`${hour}:${minute}`);
    }
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }

  slots = slots.map((slot) => {
    return <option value={slot}>{`${slot}`}</option>;
  });

  debugger

  return (
    <div className='time-bar'>
      {slots}
    </div>
  )
}

export default TimeBar;
