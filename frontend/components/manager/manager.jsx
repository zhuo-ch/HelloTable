import React from 'react';
import { connect } from 'react-redux';
import { withRouter, hashHistory } from 'react-router';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import {
  fetchManagerRestaurant,
  fetchManagerRestaurantReservations,
  updateRestaurant,
  updateHours,
  updateSeating,
  createSeating,
  removeSeating,
  setError,
  clearErrors,
} from '../../actions/manager_actions';
import { resetReservation } from '../../actions/reservations_actions';
import { StickyContainer, Sticky } from 'react-sticky';
import { formatHoursMinutes, formatDate } from '../../util/search_util';
import ManagerSideBar from './manager_side_bar';
import RestaurantMap from '../restaurant/restaurant_map';
import DateBar from '../search/date_bar';
import ManagerDetails from './manager_details';
import ManagerHours from './manager_hours';
import ManagerSeating from './manager_seats';
import ManagerReservation from './manager_reservations';
import ManagerLi from './manager_li';
import ManagerField from './field';
import { merge } from 'lodash';
import * as ManagerUtil from '../../util/manager_util';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selecting: false, idx: '', value: '', };
    this.handleSideBar = this.handleSideBar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddTables = this.handleAddTables.bind(this);
    this.handleRemoveTable = this.handleRemoveTable.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.currentUser.id) {
      hashHistory.push('/');
    } else {
      this.props.fetchManagerRestaurant(this.props.currentUser.id);
    }
  }

  componentDidMount() {
    const date = formatDate();
    this.setState({ date });
  }

  componentWillUnmount() {
    this.props.resetReservation();
  }

  handleSideBar(e) {
    e.preventDefault();
    const reference = document.getElementById(e.currentTarget.innerText);
    reference.scrollIntoView({ behavior: 'smooth' });
  }

  handleClick(e) {
    e ? e.preventDefault() : '';
    this.props.clearErrors();
    setTimeout(this.props.resetCurrentModal, 300);
    const selecting = this.state.selecting ? false : true;
    this.setState({ selecting: selecting });
    e ? this.setState({ idx: e.currentTarget.id }) : '';
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  }

  handleSave() {
    const idx = this.state.idx.split('-');
    this.props.setCurrentModal({ hidden: false, type: 'spinner' });

    switch (idx[0]) {
      case 'hours':
        this.handleUpdateHour(idx);
        break;
      case 'seatings':
        this.handleUpdateSeating(idx);
        break;
      default:
        this.handleUpdateRestaurant(idx)
    }
  }

  handleUpdateSeating(idx) {
    let seating = merge({}, this.props.restaurant.seatings[idx[1]]);
    seating[idx[2]] = parseInt(this.state.value);
    this.props.updateSeating(seating).then(() => this.handleClick());
  }

  handleUpdateHour(idx) {
    let hour = merge({}, this.props.restaurant.hours[idx[1]]);
    hour[idx[2]] = ManagerUtil.to24(this.state.value);
    hour[idx[2]] ? this.props.updateHours(hour).then(() => this.handleClick()) : this.handleHourError();
  }

  handleHourError() {
    this.props.resetCurrentModal();
    const error = { responseJSON: ['Please use 12 hour format (example: 10:30AM, 3:45PM)']};
    this.props.setError(error);
  }

  handleUpdateRestaurant(idx) {
    if (idx[0] === 'phone' && ManagerUtil.invalidPhone(this.state.value)) {
      this.props.setError({ responseJSON: ['Please enter valid number i.e. (XXX)XXX-XXXX or XXX-XXXX-XXXX']});
    } else {
      let dupRestaurant = merge({}, this.props.restaurant);
      dupRestaurant[idx] = this.state.value;
      this.props.updateRestaurant(dupRestaurant).then(() => this.handleClick());
    }
  }

  handleAddTables() {
    this.props.setCurrentModal({
      hidden: false,
      type: 'addTable',
    });
  }

  handleRemoveTable(e) {
    e.preventDefault();
    debugger
    const id = e.currentTarget.parentElement.id;
    this.props.removeSeating(this.props.restaurant.seatings[id].id);
  }

  handleDateChange(e) {
    e.preventDefault();
    const newDate = e.currentTarget.value.split('-');
    const date = newDate[1]+'-'+newDate[2]+'-'+newDate[0];
    this.setState({ date });
    this.props.fetchManagerRestaurantReservations({ id: this.props.restaurant.id, date });
  }

  // getSideBar() {
  //   const bar = ['Details', 'Hours of Operation', 'Tables', 'Reservations'].map((el, idx) =>{
  //     return (
  //       <article
  //         key={ idx }
  //         className='about-description'
  //         onClick={ this.handleSideBar }>
  //         { el }
  //       </article>
  //     );
  //   });
  //
  //   return (
  //     <Sticky>
  //       { bar }
  //     </Sticky>
  //   )
  // }

  getSideBar() {
    return (
      <ManagerSideBar
        sections={ ['Details', 'Hours of Operation', 'Tables', 'Reservations'] }
        handleClick={ this.handleSideBar }
        />
    );
  }

  getRightBar() {
    return (
      <section className='manager-map'>
        <RestaurantMap
          location={ this.props.restaurant.location }
          address={ this.props.restaurant.address } />
      </section>
    );
  }

  getDetails() {
    return (
      <ManagerDetails
          restaurant={ this.props.restaurant }
          state={ this.state }
          change={ this.handleChange }
          save={ this.handleSave }
          click={ this.handleClick }
          />
    );
  }

  getTimes() {
    return (
      <ManagerHours
        restaurant={ this.props.restaurant }
        state={ this.state }
        change={ this.handleChange }
        click={ this.handleClick }
        save={ this.handleSave }
        />
    );
  }

  getSeating() {
    return (
      <ManagerSeating
        restaurant={ this.props.restaurant }
        state={ this.state }
        change={ this.handleChange }
        click={ this.handleClick }
        save={ this.handleSave }
        addTables={ this.handleAddTables }
        handleRemove={ this.handleRemoveTable }
        />
    );
  }

  getReservations() {
    return (
      <ManagerReservation
        reservations={ this.props.reservations }
        state={ this.state }
        handleChange={ this.handleDateChange }
        />
    );
  }

  render() {
    const loaded = this.props.restaurant.id ? true : false;
    const details = loaded ? this.getDetails() : '';
    const times = loaded ? this.getTimes() : '';
    const seatings = loaded ? this.getSeating() : '';
    const sideBar = this.getSideBar();
    const rightBar = this.getRightBar();
    const reservations = Object.keys(this.props.reservations).length > 0 ? this.getReservations() : '';

    return (
      <StickyContainer className='restaurant-view'>
        <div className='restaurant-body'>
          <div className='restaurant-left'>
            { sideBar }
          </div>
          <div className='restaurant-mid'>
            { details }
            { times }
            { seatings }
            { reservations }
          </div>
          <div className='restaurant-right'>
            { rightBar }
          </div>
        </div>
      </StickyContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  restaurant: state.restaurants.restaurant,
  reservations: state.reservations.restaurantReservations,
});

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  fetchManagerRestaurant: id => dispatch(fetchManagerRestaurant(id)),
  fetchManagerRestaurantReservations: query => dispatch(fetchManagerRestaurantReservations(query)),
  resetReservation: () => dispatch(resetReservation()),
  updateRestaurant: restaurant => dispatch(updateRestaurant(restaurant)),
  updateSeating: seating => dispatch(updateSeating(seating)),
  updateHours: hour => dispatch(updateHours(hour)),
  createSeating: seating => dispatch(createSeating(seating)),
  removeSeating: id => dispatch(removeSeating(id)),
  setError: error => dispatch(setError(error)),
  clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
