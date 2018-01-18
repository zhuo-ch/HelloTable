import React from 'react';
import { connect } from 'react-redux';
import * as ManagerUtil from '../../util/manager_util';
import * as DateUtil from '../../util/date_util';
import { fetchManagerRestaurantReservations, resetReservation } from '../../actions/reservations_actions';
import DateBar from '../search/date_bar';

class ManagerReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.date = new Date();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchManagerRestaurantReservations({
      id: this.props.currentUser.manager,
      date: DateUtil.dateToString(this.date),
    });
    const date = DateUtil.toInputDate(this.date);
    this.setState({ date });
  }

  componentWillUnmount() {
    this.props.resetReservation();
  }

  handleChange(e) {
    e.preventDefault();
    const newDate = e.currentTarget.value;
    const date = DateUtil.toInputDate(new Date(newDate));
    this.setState({ date });
    this.props.fetchManagerRestaurantReservations({
      id: this.props.currentUser.manager,
      date: DateUtil.inputDatetoDBDate(date),
    });
  }

  getDateBox() {
    const date = this.state.date ? this.state.date : DateUtil.toInputDate(this.date);

    return (
      <DateBar
        defaultDate={ date }
        handleChange={ this.handleChange }
        />
    );
  }

  getReservationsItem(reservation, idx) {
    const time = DateUtil.format12Hour(reservation.time);

    return (
      <li className='horizontal' key={ idx }>
        <span className='manager-text'>{ time }</span>
        <span className='manager-text'>Table for</span>
        <span className='manager-highlight'>{ reservation.seats }</span>
        <span className='manager-text'>for</span>
        <span className='manager-highlight'>{ reservation.client }</span>
      </li>
    );
  }

  getReservationsList() {
    return this.props.reservations.map((reservation, idx) => this.getReservationsItem(reservation, idx));
  }

  getReservationsSections() {
    const dateBox = this.getDateBox();
    const reservations = this.getReservationsList();
    const addOn = <article className='manager-date'>{ dateBox }</article>;

    return ManagerUtil.createSection({
      id: 'Reservations',
      title: 'Reservations',
      liElements: reservations,
      titleAddon: addOn,
    });
  }

  render() {
    const reservationsSection = this.getReservationsSections();

    return reservationsSection;
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  reservations: state.reservations.restaurantReservations,
});

const mapDispatchToProps = dispatch => ({
  fetchManagerRestaurantReservations: query => dispatch(fetchManagerRestaurantReservations(query)),
  resetReservation: () => dispatch(resetReservation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerReservations);
