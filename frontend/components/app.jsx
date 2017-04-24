import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './navbar';
import SplashIndex from './splash_index'

const App = (props) => {
  return (
    <div className='main-app'>
      <Navbar />
      { props.children }
    </div>
  )
}

export default App;
