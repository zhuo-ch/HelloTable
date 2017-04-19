import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

const Navbar = (state) => {
  let rightBar;
  let inForm = ((state.location.pathname === '/signup') || (state.location.pathname === '/login')) ? false : true;

  function handleLogIn() {
    state.router.push('/login');
  }

  function handleSignUp() {
    state.router.push('/signup');
  }

  function handleLogOut() {
    state.logout().then(() => {
      debugger
      state.router.push('/login');
    }
  );
  }

  if (inForm) {
    if (state.currentUser) {
      rightBar = (
        <section className="nav-right">
          <h4>Welcome back {state.currentUser.username}</h4>
          <button onClick={handleLogOut}>Log out</button>
        </section>
      );
    } else {
      rightBar = (
        <section className="nav-right">
          <button onClick={handleLogIn}>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </section>
      );
    }
  }

  return (
    <div className="navbar">
      <h2>Hello world</h2>
      {rightBar}
      {state.children}
    </div>
  );
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
