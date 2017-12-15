import React from 'react';
import * as ManagerUtil from '../../util/manager_util';
import { formatHoursMinutes, formatDate } from '../../util/search_util';
import DateBar from '../search/date_bar';

export default ({reservations, state, handleChange}) => {
  const getDateBox = () => {
    return (
      <DateBar
        defaultDate={ state.date ? state.date : formatDate() }
        handleChange={ handleChange }
        />
    );
  };

  reservations = reservations.sort((a, b) => a.time - b.time);
  reservations = reservations.map((reservation, idx) => {
    const time = formatHoursMinutes(reservation.time);

    return (
      <li className='horizontal' key={ idx }>
        <span className='manager-text'>{ time }</span>
        <span className='manager-text'>Table for</span>
        <span className='manager-highlight'>{ reservation.seats }</span>
        <span className='manager-text'>for</span>
        <span className='manager-highlight'>{ reservation.client }</span>
      </li>
    );
  });

  const dateBox = getDateBox();
  const addOn = <article className='manager-date'>{ dateBox }</article>;

  return ManagerUtil.createSection({
    id: 'Reservations',
    title: 'Reservations',
    liElements: reservations,
    titleAddon: addOn,
  });
}
