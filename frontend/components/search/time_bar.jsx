import React from 'react';
import { Link } from 'react-router';

const TimeBar = () => {
  const currentTime = new Date();
  let startTime = 12;
  let endTime = 24;
  let minutes = (currentTime.getMinutes() < 30) ? 0 : 30
  let slots = new Array();

  function formatMinutes(minute) {
    if (minute === 0) {
      return '0' + minute.toString();
    } else {
      return minute.toString();
    }
  }

  function formatHour(hour) {
    if (hour > 12) {
      return (hour%12).toString();
    } else {
      return hour.toString();
    }
  }

  while (startTime < endTime) {
    slots.push(formatHour(startTime)+":"+formatMinutes(minutes))
    minutes += 30;

    if (minutes === 60) {
      minutes = 0;
      startTime += 1;
    }
  }

  slots = slots.map((slot) => {
    return <option value={slot}>{`${slot}`}</option>;
  });

  debugger

  return (
    <input type='select' className='time-bar'>
      {slots}
    </input>
  )
}

export default TimeBar;
