import React from 'react';
import { Link } from 'react-router';
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
            <section className='welcome'>
              <h4>Hi, {this.props.currentUser.username}!</h4>
              <button onClick={this.handleLogOut}>Log out</button>
            </section>
          </section>
        );
      } else {
        bar = (
          <section className="right-bar">
            <section className='nav-link'>
              <Link to='/login'>Log In</Link>
            </section>
            <section className='nav-link'>
              <Link to='/signup'>Sign Up</Link>
            </section>
          </section>
        );
      }
    }

    return bar;
  }

  handleLogOut() {
    this.props.logout().then(() => {
      this.props.router.push('/login');
    })
  }


  render () {
    return (
      <div className='navbar'>
        <section className='nav-left'>
          <section className='nav-logo'>
            <Link to='/'>
              <h2>Hello world</h2>
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
