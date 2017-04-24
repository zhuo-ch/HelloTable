import React from 'react';
import { Link } from 'react-router';
import TimeBar from './time_bar';
import SearchBar from './search_bar';

const ReservationBar = ({ restaurants, restaurantId }) => {
  let seats = [];

  for (let i = 1; i < 11; i++) {
    seats.push(<option key={i} value={i}>{i} Seats</option>)
  }

  return (
    <div className='search-bar'>
      <section className='numSeats'>
        <form className='seats-form'>
          <select name='seats'>
            { seats }
          </select>
        </form>
      </section>
      <section className='date'>

      </section>
      <section className='time'>

      </section>
      <section className='search-field'>
        <SearchBar />
      </section>
    </div>
  );
}

export default ReservationBar;
