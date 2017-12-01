import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchRestaurantReservations, createReservation, resetReservation } from '../../actions/reservations_actions';
import FontAwesome from 'react-fontawesome';
import { merge } from 'lodash';
import { setCurrentModal } from '../../actions/modal_actions';
import * as SearchAPIUtil from '../../util/search_api_util';
import * as DateSelectors from '../../selectors/date_selectors';

class ReservationsSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.handleReserve = this.handleReserve.bind(this);
    this.getTimeSlots = this.getTimeSlots.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentWillMount() {
    // const time = parseInt(this.props.searchParams.time.split(':').join(''));
    // const query = merge({}, this.props.searchParams, { restaurantId: this.props.restaurant.id, time })
    const query = this.getQuery(this.props.searchParams);
    this.props.fetchRestaurantReservations(query);
    // debugger
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchParams !== nextProps.searchParams) {
      const query = this.getQuery(nextProps.searchParams);
      debugger
      this.props.fetchRestaurantReservations(query);
    }
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

  getQuery(params) {
    const time = parseInt(params.time.split(':').join(''));
    return merge({}, params, { restaurantId: this.props.restaurant.id, time });
  }

  getTimeSlots() {
    const seatings = this.props.reservations.seatings;
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

  getReservationsList() {
    const seatings = merge({}, this.props.reservations.seatings);
    delete seatings.seating_id;

    const availList = Object.keys(seatings).map(key => {
      if (seatings[key]) {
        return (<li
          className='reservable button res-button'
          onClick={ this.handleReserve }
          value={ key }
          key={ key }>{ DateSelectors.formatTime(key) }</li>)
      } else {
        return (<li
          className='not-reservable res-button'
          key={ key }>{ DateSelectors.formatTime(key) }</li>)
      }
    });

    return availList;
  }

  reservationItems() {
    if (!this.props.reservations.hasOwnProperty('seatings')) {
      return ;
    }

    const availList = this.getReservationsList();
    const date = DateSelectors.formatDate(this.props.searchParams.date);

    return (
      <ul className='res-avail-list'>
        <li
          className='reserve-date'>{date}</li>
        { availList }
      </ul>
    )
  }

  showReservation() {
    const resDate = DateSelectors.formatDate(this.props.currentReservation.date);
    const resTime = DateSelectors.formatTime(this.props.currentReservation.time);

    return (
      <ul className='new-res'>
        <li className='res-message'>
          A table for {'  '}
          {this.props.currentReservation.seats}
          {'  '} will be set for {'  '}
          {this.props.currentReservation.username}
          {'  '} on {resDate} at {resTime}
        </li>
        <li className='new-res-button'><button className='button' onClick={ this.handleShow }>View</button></li>
      </ul>
    )
  }

  render() {
    const availReservations = this.props.currentReservation.id ? this.showReservation() : this.reservationItems();

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
    reservations: state.reservations.restaurantReservations,
    currentReservation: state.reservations.currentReservation,
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
