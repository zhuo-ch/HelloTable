import React from 'react';
import { connect } from 'react-redux';
import * as ManagerUtil from '../../util/manager_util';
import { formatHoursMinutes, formatDate } from '../../util/search_util';
import { fetchManagerRestaurantReservations } from '../../actions/reservations_actions';
import DateBar from '../search/date_bar';

class ManagerReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchManagerRestaurantReservations({ id: this.props.currentUser.manager, date: formatDate()});
  }

  componentDidMount() {
    const date = formatDate();
    this.setState({ date });
  }

  handleChange(e) {
    e.preventDefault();
    const newDate = e.currentTarget.value.split('-');
    const date = newDate[1]+'-'+newDate[2]+'-'+newDate[0];
    this.setState({ date });
    this.props.fetchManagerRestaurantReservations({ id: this.props.currentUser.id, date });
  }

  getDateBox() {
    return (
      <DateBar
        defaultDate={ this.state.date ? this.state.date : formatDate() }
        handleChange={ this.handleChange }
        />
    );
  }

  getReservationsItem(reservation, idx) {
    const time = formatHoursMinutes(reservation.time);

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
    debugger
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerReservations);
