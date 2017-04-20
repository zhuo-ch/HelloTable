import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './navbar';

const App = ({children}) => {
  return (
    <div className='main-app'>
      <Navbar />
      <Link to='/restaurant/4'>Restaurant 4</Link>
      { children }
    </div>
  )
}

export default App;
