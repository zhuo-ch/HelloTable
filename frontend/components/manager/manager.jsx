import React from 'react';
import { connect } from 'react-redux';
import { withRouter, hashHistory } from 'react-router';
import { fetchManagerRestaurant } from '../../actions/manager_actions';
import { resetRestaurant } from '../../actions/restaurant_actions';
import { resetReservation } from '../../actions/reservations_actions';
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
  }

  componentWillMount() {
    if (!this.props.currentUser.id) {
      hashHistory.push('/');
    } else {
      this.props.fetchManagerRestaurant(this.props.currentUser.id);
    }
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

  getSideBar() {
    return (
      <ManagerSideBar
        sections={ ['Details', 'Hours of Operation', 'Tables', 'Reservations', 'Reviews'] }
        handleClick={ this.handleSideBar }
        />
    );
  }

  render() {
    const sideBar = this.getSideBar();

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
            <section className='manager-map'>
              <RestaurantMap />
            </section>
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
  fetchManagerRestaurant: id => dispatch(fetchManagerRestaurant(id)),
  resetRestaurant: () => dispatch(resetRestaurant()),
  resetReservation: () => dispatch(resetReservation()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
