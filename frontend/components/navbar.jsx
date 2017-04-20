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
          <h4>Welcome back {this.props.currentUser.username}</h4>
          <button onClick={this.handleLogOut}>Log out</button>
          </section>
        );
      } else {
        bar = (
          <section className="nav-right">
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
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
        <section className='navlogo'>
          <Link to='/'>
            <h2>Hello world</h2>
          </Link>
        </section>
        <section className='rightbar'>
          {this.rightBar()}
        </section>
        {this.props.children}
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
