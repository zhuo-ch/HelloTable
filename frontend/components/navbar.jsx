import React from 'react';
import { Link, Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import FontAwesome from 'react-fontawesome';
import Modal from './modal';
import { setCurrentModal } from '../actions/modal_actions';
import { formatDate, formatTime, revertDate } from '../selectors/date_selectors';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { idx: 0 };
    this.handleModal = this.handleModal.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.increment = this.increment.bind(this);
    this.startScroll = this.startScroll.bind(this);
    this.stopScroll = this.stopScroll.bind(this);
  }

  componentWillMount() {
    this.props.currentUser.id ? this.startScroll() : '';
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.currentUser.id) && (nextProps.currentUser !== this.props.currentUser)) {
      this.stopScroll();
      this.startScroll();
    } else {
      this.stopScroll();
    }
  }

  handleModal(e) {
    e.preventDefault();
    this.props.setCurrentModal({hidden: false, type: e.currentTarget.name});
  }

  handleLogOut() {
    hashHistory.push('/');
    this.props.logout();
  }

  getLeftBar() {
    return (
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
    );
  }

  increment() {
    const max = this.state.max;
    this.state.idx === max - 1 ? this.setState({ idx : 0 }) : this.setState({ idx: this.state.idx + 1 });
  }

  setScrollType() {
    if (this.props.currentUser.reservations) {
      var reservations = this.filterUpcomingReservations();
    }
    if (this.props.currentUser.reservations && reservations.length > 0) {
      this.setState({ type: 'reservations', reservations, max: reservations.length });
    } else if (this.props.currentUser.favorites) {
      this.setState({ type: 'favorites', max: this.props.currentUser.favorites.length });
    }
  }

  startScroll() {
    this.timer = this.setTimer();
    this.setScrollType();
  }

  stopScroll() {
    clearInterval(this.timer);
    this.setState({ type: '' });
  }

  setTimer() {
    return setInterval(this.increment, 5000);
  }

  filterUpcomingReservations() {
    return this.props.currentUser.reservations.filter(reservation => {
      const resDate = this.props.revertDate(reservation.date, reservation.time);

      return new Date() < resDate;
    })
  }

  getReservationItem() {
    const item = this.state.reservations[this.state.idx];
    const date = this.props.formatDate(item.date);
    const time = this.props.formatTime(item.time);
    const text = `${time} on ${date} at ${item.restaurant.restaurant_name}`;
    const link = `/users/${this.props.currentUser.id}`;

    return (
      <Link to={ link } className='nav-item'>
        <aside className='nav-item-type'>Upcoming Reservation:</aside>
        <aside>{ text }</aside>
      </Link>
    );
  }

  getFavoriteItem() {
    const item = this.props.currentUser.favorites[this.state.idx].restaurant;
    const link = `/restaurant/${item.id}`;

    return (
      <Link to={ link } className='nav-item'>
        <aside className='nav-item-type'>Your Favorites:</aside>
        <aside>{ item.restaurant_name } has open tables!</aside>
      </Link>
    )
  }

  getMidBar() {
    if (this.state.type === 'reservations') {
      return this.getReservationItem();
    } else if (this.state.type === 'favorites') {
      return this.getFavoriteItem();
    }

    return '';
  }

  getRightBar() {
      if (this.props.currentUser.id) {
        return (
          <section className="nav-right">
            <section className='nav-welcome'>
              <h4>
                <Link to={`users/${this.props.currentUser.id}`}>
                Hi, {' ' + this.props.currentUser.username}{'   '}<FontAwesome name='cog'
                className='fa fa-cog icon'/>
                </Link>
              </h4>
              <button onClick={this.handleLogOut} className='button'>Log out</button>
            </section>
          </section>
        );
      } else {
        return (
          <section className="right-bar">
            <button name='login'
              className='button'
              onClick={this.handleModal}>
              Log In
            </button>
            <button name='signup'
              className='button'
              onClick={this.handleModal}>
              Sign Up
            </button>
          </section>
      );
    }
  }


  render () {
    const leftBar = this.getLeftBar();
    const midBar = this.getMidBar();
    const rightBar = this.getRightBar();

    return (
      <div className='navbar'>
        { leftBar }
        <section className='nav-mid'>
          { midBar }
        </section>
        <section className='nav-right'>
          { rightBar }
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
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  formatDate: date => formatDate(date),
  formatTime: time => formatTime(time),
  revertDate: (date, time) => revertDate(date, time),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
