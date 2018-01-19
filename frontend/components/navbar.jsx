import React from 'react';
import { Link, Router, Route, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import FontAwesome from 'react-fontawesome';
import Modal from './modal';
import { setCurrentModal } from '../actions/modal_actions';
import * as DateUtil from '../util/date_util';

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
    this.stopScroll();
    this.props.currentUser.id ? this.startScroll() : '';
  }

  componentWillReceiveProps(nextProps) {
    const noUser = !nextProps.currentUser.id;
    const diffRes = this.props.reservations !== nextProps.reservations;
    const diffFav = this.props.favorites !== nextProps.favorites;
    if (noUser || diffRes || diffFav) {
      this.stopScroll();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const hasScrollItems = (this.props.reservations > 0) || (Object.keys(this.props.favorites).length > 0);
    const x = hasScrollItems && this.state.type === ''
    const y = prevProps.reservations !== this.props.reservations;
    const z = prevProps.favorites !== this.props.favorites;

    if (x || y || z) {
      this.stopScroll();
      this.startScroll();
    }
  }

  handleModal(e) {
    e.preventDefault();
    this.props.setCurrentModal({hidden: false, type: e.currentTarget.name});
  }

  handleLogOut() {
    if (this.props.location.pathname !== '/') {
      this.props.location === '/' ? '' : hashHistory.push('/');
    }
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
    const favorites = Object.keys(this.props.favorites);
    let reservations;

    if (this.props.reservations) {
      reservations = this.filterUpcomingReservations();
    }

    if (reservations.length > 0) {
      this.setState({ type: 'reservations', reservations, max: reservations.length });
    } else if (favorites.length > 0) {
      this.setState({ type: 'favorites', favorites, max: favorites.length });
    }
  }

  startScroll() {
    this.timer = this.setTimer();
    this.setScrollType();
  }

  stopScroll() {
    clearInterval(this.timer);
    this.setState({ type: '', reservations: [], max: 0 });
  }

  setTimer() {
    return setInterval(this.increment, 5000);
  }

  filterUpcomingReservations() {
    const reservations = this.props.reservations;

    return Object.keys(reservations).filter(key => {
      const resDate = DateUtil.revertDate(reservations[key].date, reservations[key].time);

      return new Date() < resDate;
    });
  }

  getReservationItem() {
    const idx = this.state.reservations[this.state.idx];
    const item = this.props.reservations[idx];
    const date = DateUtil.dateToFullString(item.date);
    const time = DateUtil.format12Hour(item.time);
    const text = `${time} on ${date} at ${ item.name ? item.name : item.restaurant.name }`;
    const link = `/users/${this.props.currentUser.id}`;

    return (
      <Link to={ link } className='nav-item'>
        <aside className='nav-item-type'>Upcoming Reservation:</aside>
        <aside>{ text }</aside>
      </Link>
    );
  }

  getFavoriteItem() {
    const idx = this.state.favorites[this.state.idx];
    const item = this.props.favorites[idx];
    const link = `/restaurant/${item.id}`;

    return (
      <Link to={ link } className='nav-item'>
        <aside className='nav-item-type'>Your Favorites:</aside>
        <aside>{ item.name } has open tables!</aside>
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

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    reservations: state.session.currentUser.reservations,
    favorites: state.session.currentUser.favorites,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
