import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllReservations, createReservation } from '../../actions/reservations_actions';
import FontAwesome from 'react-fontawesome';
import { merge } from 'lodash';

class ReservationsSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "", time: '800' };
    this.handleReserve = this.handleReserve.bind(this);
  }

  componentWillMount() {
    const _default = new Date;
    let query = {
      date: [(_default.getMonth()+1).toString(), _default.getDate().toString(), _default.getFullYear().toString()].join('-'),
      time: '800',
      restaurantId: this.props.restaurant.id,
      type: 'restaurant',
    }

    if (this.props.searchResults) {
      this.setState({date: this.props.searchResults.date, time: this.props.searchResults.time});

      query = {
        date: this.props.searchResults.date,
        time: this.props.searchResults.time,
        restaurantId: this.props.restaurant.id,
        type: 'restaurant',
        }
      } else {
        this.setState({date: query.date});
      }

    this.props.fetchAllReservations(query);
  }

  handleReserve(e) {
    e.preventDefault();
    const time = parseInt(e.currentTarget.innerText.split(":").join(""));
    debugger
    const reservation = { user_id: this.props.currentUser.id, restaurant_id: this.props.restaurant.id,
      date: this.state.date, time };
    this.props.createReservation(reservation);

  }

  formatMinutes(minute) {
    if (minute === 0) {
      return '0' + minute.toString();
    } else {
      return minute.toString();
    }
  }

  formatHour(hour) {
    if (hour > 12) {
      return (hour%12).toString();
    } else {
      return hour.toString();
    }
  }

  reservationItems() {
    let baseTime = parseInt(this.state.time);
    let minutes = 0;

    if (this.props.searchResults) {
      const timeParse = this.props.searchResults.time;
      baseTime = parseInt(timeParse);
      minutes = parseInt(timeParse.slice(timeParse.length-2, timeParse.length-1));
    }

    let timeStart = baseTime-100;
    const timeEnd = baseTime+100;
    let slots = new Object;

    while (timeStart <= timeEnd) {
      let hour = timeStart.toString();
      hour = hour.slice(0, hour.length-2);
      let timeSlot = (this.formatHour(hour)+":"+this.formatMinutes(minutes));
      slots[timeSlot] = 0;

      minutes += 30;

      if (minutes === 60) {
        minutes = 0;
        timeStart += 100;
      }
    }

    const reservations = Object.keys(this.props.reservations).map((key) => {
      return this.props.reservations[key];
    });


    reservations.forEach((reservation) => {
      function formatTime(time) {
        const formatedTime = time.toString();
        return formatedTime.slice(0, formatedTime.length-2) + ':' + formatedTime.slice(formatedTime.length-2, formatedTime.length);
      }

      const newTime = formatTime(reservation.time)
      slots[newTime] += 1;
    })

    const availList = Object.keys(slots).map((slot) => {
      if (slots[slot] > 1) {
        return (<li
          className='not-reservable res-button'
          key={slot}>{slot}</li>)
      } else {
        return (<li
          className='reservable button res-button'
          onClick={this.handleReserve}
          value={slot}
          key={slot}>{slot}</li>)
      }
    });

    const date = this.formatDate(this.props.date);

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
        <li className='res-message'>A table will be set for {this.props.reservations.reservation.username}</li>
        <li className='res-details'>{resDate} at {this.props.reservations.reservation.time}</li>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsSnippet);
