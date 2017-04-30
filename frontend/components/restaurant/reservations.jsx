import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllReservations, createReservation, resetReservation } from '../../actions/reservations_actions';
import FontAwesome from 'react-fontawesome';
import { merge } from 'lodash';

class ReservationsSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "", time: "" };
    this.handleReserve = this.handleReserve.bind(this);
    this.getTimeSlots = this.getTimeSlots.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  currentDate() {
    const defaultDate = new Date;
    const date = [(defaultDate.getMonth()+1).toString(),
      defaultDate.getDate().toString(),
      defaultDate.getFullYear().toString()].join('-');
    const time = '800';
    const restaurantId = this.props.restaurant.id;
    const type = 'restaurant';
    const seats = '2';
    return { date, time, restaurantId, type, seats };
  }

  componentWillMount() {
    let query = this.currentDate();
    if (this.props.searchResults.time) {
      query = {
        seats: this.props.searchResults.seats,
        date: this.props.searchResults.date,
        time: this.props.searchResults.time,
        restaurantId: this.props.restaurant.id,
        type: 'restaurant',
        }
      }

    this.setState({date: query.date, time: query.time, seats: query.seats});
    this.props.fetchAllReservations(query);
  }

  componentWillUnmount() {
    this.props.resetReservation();
  }

  handleReserve(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      const time = parseInt(e.currentTarget.innerText.split(":").join(""));
      const reservation = { user_id: this.props.currentUser.id, restaurant_id: this.props.restaurant.id,
        date: this.state.date, seats: this.state.seats, time };
        this.props.createReservation(reservation);
    } else {
      hashHistory.push('/login');
    }
  }

  handleShow(e) {
    e.preventDefault();
    hashHistory.push(`/users/${this.props.currentUser.id}`);
  }

  formatMinutes(minute) {
    if (minute === 0) {
      return '00';
    } else {
      return '30';
    }
  }

  formatHour(hour) {
    if (hour > 12) {
      return (hour%12).toString();
    } else {
      return hour.toString();
    }
  }

  getTimeSlots(baseTime) {
    const baseStr = baseTime.toString();
    const timeEnd = baseTime+100;
    let timeStart = baseTime-100;
    let minutes = minutes = parseInt(baseStr.slice(baseStr.length-2, baseStr.length));
    let slots = new Object;

    while (timeStart <= timeEnd) {
      let hour = timeStart.toString();
      hour = hour.slice(0, hour.length-2);
      let timeSlot = (this.formatHour(hour) + this.formatMinutes(minutes));
      slots[timeSlot] = 0;

      minutes += 30;

      if (minutes === 60) {
        minutes = 0;
        timeStart += 100;
      }
    }

    return slots;
  }

  reservationItems() {
    let baseTime = parseInt(this.state.time);
    let slots = this.getTimeSlots(baseTime);
    const reservations = Object.keys(this.props.reservations).map((key) => {
      return this.props.reservations[key];
    });

    reservations.forEach((reservation) => {
      const resTime = reservation.time.toString();
      slots[resTime] += 1;
    })

    const availList = Object.keys(slots).map((slot) => {
      if (slots[slot] > 1) {
        return (<li
          className='not-reservable res-button'
          key={slot}>{this.formatTime(slot)}</li>)
      } else {
        return (<li
          className='reservable button res-button'
          onClick={this.handleReserve}
          value={slot}
          key={slot}>{this.formatTime(slot)}</li>)
      }
    });

    const date = this.formatDate(this.state.date);

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

const mapStateToProps = (state, { restaurantId, time, date, fetchType }) => {
  return ({
    currentUser: state.session.currentUser,
    searchResults: state.search.searchResults,
    reservations: state.reservations,
    restaurant: state.restaurants.restaurant,
  })
};

const mapDispatchToProps = dispatch => ({
  fetchAllReservations: (query) => dispatch(fetchAllReservations(query)),
  createReservation: (reservation) => dispatch(createReservation(reservation)),
  resetReservation: () => dispatch(resetReservation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsSnippet);
