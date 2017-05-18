import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './navbar';
import Modal from './modal';

const App = (props) => {

  const Footer = () => {
    return (
      <footer className="footer">
        <ul className="footer-links">
          <li><a href="https://zhuo-ch.github.io/" className="copyright"><span className="label">&copy; Zhuo Chen</span></a></li>
          <li><a href="http://www.linkedin.com/in/zhuohchen/" className="fa fa-linkedin"> <span className="label">LinkedIn</span></a></li>
          <li><a href="https://github.com/zhuo-ch/" className="fa fa-github"> <span className="label">GitHub</span></a></li>
        </ul>
      </footer>
    )
  }

  return (
    <div className='main-app'>
      <Modal />
      <Navbar />
      { props.children }
      <Footer />
    </div>
  )
}

export default App;
