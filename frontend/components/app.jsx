import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './navbar';
import Modal from './modal';

const App = (props) => {

  return (
    <div className='main-app'>
      <Modal />
      <Navbar />
      { props.children }
    </div>
  )
}

export default App;
