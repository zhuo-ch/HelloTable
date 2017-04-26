import React from 'react';
import { Link, Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  rightBar() {
    let bar;
    let inForm = ((this.props.formType === 'signup') || (this.props.formType === 'login')) ? false : true;

    if (inForm) {
      if (this.props.currentUser) {
        bar = (
          <section className="nav-right">
            <section className='nav-welcome'>
              <h4>Hi, {this.props.currentUser.username}!</h4>
              <button onClick={this.handleLogOut} className='button'>Log out</button>
            </section>
          </section>
        );
      } else {
        bar = (
          <section className="right-bar">
            <Link to='/login' className='nav-link button'>
              Log In
            </Link>
            <Link to='/signup' className='nav-link button'>
              Sign Up
            </Link>
          </section>
        );
      }
    }

    return bar;
  }

  handleLogOut() {
    this.props.logout()
  }

  // 'http://i.imgur.com/3ztfVmN.png'

  render () {
    return (
      <div className='navbar'>
        <section className='nav-left'>
          <section className='nav-logo'>
            <Link to='/'>
              <article>
                <img src='/images/red-wine.png' />
              </article>
            </Link>
            <Link to='/' className='logo-name'>
              <h2>Hello Table</h2>
            </Link>
          </section>
        </section>
        <section className='nav-mid'>
        </section>
        <section className='nav-right'>
          {this.rightBar()}
        </section>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
  });
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
