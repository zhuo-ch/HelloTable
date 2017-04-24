import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './navbar';
import ReservationBar from './reservation_bar'


const App = (props) => {
  return (
    <div className='main-app'>
      <Navbar />
      <ReservationBar />
      { props.children }
    </div>
  )
}

export default App;
