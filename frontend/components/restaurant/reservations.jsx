import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllReservations} from '../../actions/reservations_actions';
import FontAwesome from 'react-fontawesome';

class ReservationsSnippet extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const query = {
      date: this.props.date,
      time: this.props.time,
      restaurantId: this.props.restaurantId,
      type: this.props.fetchType,
    }

    this.props.fetchAllReservations(query);
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
    let timeStart = this.props.time.slice(0, this.props.time.length - 2);
    const timeEnd = this.props.time.slice(this.props.time.length-2, this.props.time.length);
    let slots = {};

    while (timeStart <= timeEnd) {
      let timeSlot = (formatHour(timeStart)+":"+formatMinutes(minutes));
      slots[timeslot] = [];

      minutes += 30;

      if (minutes === 60) {
        minutes = 0;
        timeStart += 1;
      }
    }

    this.props.reservations.forEach((reservation) => {
      slots[reservation.time] += 1;
    })

    return Object.keys(slots).map((slot) => {
      if (slots[slot] > 2) {
        return <li className='not-reservable' onClick={this.handleNone}>{slot}</li>
      } else {
        return <li className='reservable' onClick={this.handleReserve}>{slot}</li>
      }
    });
  }



  render() {
    const reservationItems = this.reservationItems
    return (
      <div className='reservationsIndex'>
        <section className='reservationsShow'>
          <ul>
            <li className='reserve-date'>this.props.date</li>
            { reservationItems }
          </ul>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, { restaurantId, time, date, fetchType }) => {
  return ({
    reservations: state.reservations,
    restaurantId,
    time,
    date,
    fetchType,
  })
};

const mapDispatchToProps = dispatch => ({
  fetchAllReservations: (query) => dispatch(fetchAllReservations(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsSnippet);
