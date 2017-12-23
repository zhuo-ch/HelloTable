import React from 'react';
import { connect } from 'react-redux';
import { withRouter, hashHistory } from 'react-router';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import {
  fetchManagerRestaurant,
  updateRestaurant,
  setError,
  clearErrors,
} from '../../actions/manager_actions';
import { resetRestaurant } from '../../actions/restaurant_actions';
import { formatDate } from '../../util/search_util';
import { StickyContainer, Sticky } from 'react-sticky';
import ManagerSideBar from './manager_side_bar';
import RestaurantMap from '../restaurant/restaurant_map';
import DateBar from '../search/date_bar';
import ManagerDetails from './manager_details';
import ManagerHours from './manager_hours';
import ManagerSeating from './manager_seats';
import ManagerReservations from './manager_reservations';
import ManagerReviews from './manager_reviews';
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
    this.props.resetRestaurant();
  }

  handleSideBar(e) {
    e.preventDefault();
    const reference = document.getElementById(e.currentTarget.innerText);
    reference.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  getSideBar() {
    return (
      <ManagerSideBar
        sections={ ['Details', 'Hours of Operation', 'Tables', 'Reservations', 'Reviews'] }
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

  render() {
    const sideBar = this.getSideBar();
    const rightBar = this.getRightBar();

    return (
      <StickyContainer className='restaurant-view'>
        <div className='restaurant-body'>
          <div className='restaurant-left'>
            { sideBar }
          </div>
          <div className='restaurant-mid'>
            <ManagerDetails />
            <ManagerHours />
            <ManagerSeating />
            <ManagerReservations />
            <ManagerReviews />
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
});

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  fetchManagerRestaurant: id => dispatch(fetchManagerRestaurant(id)),
  resetRestaurant: () => dispatch(resetRestaurant()),
  updateRestaurant: restaurant => dispatch(updateRestaurant(restaurant)),
  clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
