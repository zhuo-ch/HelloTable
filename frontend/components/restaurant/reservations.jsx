import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchRestaurantReservations, createReservation, resetReservation } from '../../actions/reservations_actions';
import FontAwesome from 'react-fontawesome';
import { merge } from 'lodash';
import { setCurrentModal } from '../../actions/modal_actions';
import * as SearchAPIUtil from '../../util/search_api_util';

class ReservationsSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.handleReserve = this.handleReserve.bind(this);
    this.getTimeSlots = this.getTimeSlots.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentWillMount() {
    const time = parseInt(this.props.searchParams.time.split(':').join(''));
    const query = merge({}, this.props.searchParams, { restaurantId: this.props.restaurant.id, time })
    this.props.fetchRestaurantReservations(query);
  }

  componentWillUnmount() {
    this.props.resetReservation();
  }

  handleReserve(e) {
    e.preventDefault();

    if (this.props.currentUser.id) {
      const time = parseInt(e.currentTarget.innerText.split(":").join(""));
      const reservation = {
        user_id: this.props.currentUser.id,
        restaurant_id: this.props.restaurant.id,
        date: this.props.searchParams.date,
        seats: this.props.searchParams.seats,
        time: time,
      };

      this.props.createReservation(reservation);
    } else {
      this.props.setCurrentModal({hidden: false, type: 'login'});
    }
  }

  handleShow(e) {
    e.preventDefault();
    this.props.router.push(`/users/${this.props.currentUser.id}`);
  }

  getTimeSlots(baseTime) {
    const baseStr = baseTime.toString();
    const timeEnd = baseTime+100;
    let timeStart = baseTime-100;
    let minutes = parseInt(baseStr.slice(baseStr.length-2, baseStr.length));
    let slots = {};

    while (timeStart <= timeEnd) {
      slots[timeStart] = 0;
      minutes += 30;

      if (minutes >= 60) {
        minutes = 0;
        timeStart += 100;
        timeStart -= 30;
      } else {
        timeStart += minutes;
      }
    }

    return slots;
  }

  reservationItems() {
    let baseTime = parseInt(this.props.searchParams.time.split(':').join(''));
    let slots = this.getTimeSlots(baseTime);
    const reservations = Object.keys(this.props.reservations).map((key) => {
      return this.props.reservations[key];
    });

    reservations.forEach((reservation) => {
      const resTime = reservation.time;
      slots[resTime] += 1;
    });

    const availList = Object.keys(slots).map((slot) => {
      if (slots[slot] > 1) {
        return (<li
          className='not-reservable res-button'
          key={ slot }>{ slot }</li>)
      } else {
        return (<li
          className='reservable button res-button'
          onClick={ this.handleReserve }
          value={ slot }
          key={ slot }>{ slot }</li>)
      }
    });

    const date = this.formatDate(this.props.searchParams.date);

    return (
      <ul className='res-avail-list'>
        <li
          className='reserve-date'>{date}</li>
        { availList }
      </ul>
    )
  }

  formatDate(date) {
    const newDate = date.split('-');

    const newObj = new Date(newDate[2], parseInt(newDate[0])-1, newDate[1]);
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September','October', 'November', 'December'];
    return week[newObj.getDay()] + ", " + month[newObj.getMonth()] + " " + newObj.getDate();
  }

  formatTime(time) {
    const newTime = time.toString();
    return newTime.slice(0, newTime.length-2) + ":" + newTime.slice(newTime.length-2, newTime.length);
  }

  showReservation() {
    const resDate = this.formatDate(this.props.reservations.reservation.date);
    const resTime = this.formatTime(this.props.reservations.reservation.time);

    return (
      <ul className='new-res'>
        <li className='res-message'>
          A table for {'  '}
          {this.props.reservations.reservation.seats}
          {'  '} will be set for {'  '}
          {this.props.reservations.reservation.username}
          {'  '} on {resDate} at {resTime}
        </li>
        <li className='new-res-button'><button className='button' onClick={ this.handleShow }>View</button></li>
      </ul>
    )
  }

  render() {
    const availReservations = this.props.reservations.reservation ? this.showReservation() : this.reservationItems();

    return (
      <div className='reservations-index'>
        <section className='reservation-show'>
          { availReservations }
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
    searchParams: state.search.searchParams,
    reservations: state.reservations,
    restaurant: state.restaurants.restaurant,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchRestaurantReservations: query => dispatch(fetchRestaurantReservations(query)),
  createReservation: reservation => dispatch(createReservation(reservation)),
  resetReservation: () => dispatch(resetReservation()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReservationsSnippet));
