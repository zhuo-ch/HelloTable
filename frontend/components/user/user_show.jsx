import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { destroyReservation } from '../../actions/reservations_actions';
import { resetRestaurant } from '../../actions/restaurant_actions';
import FontAwesome from 'react-fontawesome';
import ReservationsSnippet from '../restaurant/reservations';
import Scrollchor from 'react-scrollchor';
import RestaurantSnippet from '../restaurant/restaurant_snippet';
import { StickyContainer, Sticky } from 'react-sticky';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import { fetchUser } from '../../actions/user_actions';
import * as DateSelectors from '../../selectors/date_selectors';
import * as ManagerUtil from '../../util/manager_util';
import * as DateUtil from '../../util/date_util';

class UserShow extends React.Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleManager = this.handleManager.bind(this);
  }

  componentWillMount() {
    if (parseInt(this.props.routeParams.userId) !== this.props.currentUser.id) {
      this.props.router.push('/');
    } else {
      this.props.setCurrentModal({ hidden: false, type: 'spinner' });
      this.props.fetchUser(this.props.currentUser.id);
    }
  }

  componentWillUnmount() {
    this.props.resetRestaurant();
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.destroyReservation(e.currentTarget.value);
  }

  handleAddReview(e) {
    e.preventDefault();
    this.props.setCurrentModal({hidden: false, type:'reviewForm', reservation: e.currentTarget.value});
  }

  handleManager(e) {
    this.props.router.push(`/manager/${this.props.currentUser.id}`);
  }

  sortReservations(user) {
    const reservations = { upcoming: [], previous: [] };

    if (user) {
      this.props.reservations.forEach(res => {
        reservations[DateSelectors.setUpcoming(res) ? 'upcoming' : 'previous'].push(res);
      });
    }

    return reservations;
  }

  getUpcoming({ upcoming }) {
    return (
      upcoming.map((reservation) => {
        return (
          <section className='show-res' key={ reservation.id }>
            <article className='user-res'>
              <h4>
                A table for { reservation.seats } will be set at { DateUtil.format12Hour(reservation.time)} on {DateUtil.dateToFullString(reservation.date)}
              </h4>
              <button onClick={ this.handleCancel } className='button' value={reservation.id}>Cancel</button>
            </article>
            <RestaurantSnippet restaurant={reservation.restaurant}/>
          </section>
        );
      }));
  }

  getPrevious({ previous }) {
    return (
      previous.map((reservation) => {
        const leaveReviewButton = reservation.reviewed ? '' : (
          <button className='button' value={ reservation.id } onClick={ this.handleAddReview }>Review</button>
        );
        return (
          <section className='show-res' key={ reservation.id }>
            <article className='user-res'>
              <h4>
                We hope you enjoyed your visit on { DateUtil.dateToFullString(reservation.date) }
              </h4>
              { leaveReviewButton }
            </article>
            <RestaurantSnippet restaurant={ reservation.restaurant }/>
          </section>
        );
      })
    );
  }

  getFavorites(user) {
    if (user) {
      return Object.keys(this.props.user.favorites).map(key => {
        return (
          <section className='show-fav' key={key}>
            <RestaurantSnippet restaurant={this.props.user.favorites[key].restaurant} />
          </section>
        );
      });
    }
  }

  getManager() {
    return this.props.manager ? ManagerUtil.createButton(`Manage my Restaurant`, this.handleManager) : '';
  }

  render() {
    const user = this.props.user.id ? true : false;
    const reservations = this.sortReservations(user);
    const Upcoming = this.getUpcoming(reservations);
    const Previous = this.getPrevious(reservations);
    const Favorites = this.getFavorites(user);
    const manager = this.getManager();

    return(
      <StickyContainer className='user-show'>
        <section className='user-show-splash'>
          <h2>{this.props.currentUser.username}</h2>
          <h5>You have {Upcoming.length} upcoming reservations.</h5>
          </section>
        <div className='user-show-body'>
          <div className='user-show-nav'>
            <Sticky>
              <ul className='user-nav-options'>
                <li>
                  <Scrollchor to='#up-res'><h3>Upcoming Reservation</h3></Scrollchor>
                </li>
                <li>
                  <Scrollchor to='#prev-res'><h3>Previous Reservations</h3></Scrollchor>
                </li>
                <li>
                  <Scrollchor to='#favorites'><h3>Favorites</h3></Scrollchor>
                </li>
              </ul>
              { manager }
            </Sticky>
          </div>

          <div className='user-show-main'>
            <section className='user-show-res'>
              <article className='user-show-res-header' id='up-res'><h2>Upcoming Reservations</h2></article>
              { Upcoming }
            </section>
            <section className='user-show-res'>
              <article className='user-show-res-header' id='prev-res'><h2>Previous Reservations</h2></article>
              { Previous }
            </section>
            <section className='user-show-res'>
              <article className='user-show-res-header' id='favorites'><h2>Favorites</h2></article>
              { Favorites }
            </section>
          </div>
        </div>
      </StickyContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
    user: state.user,
    favorites: state.favorites,
    reservations: state.reservations.userReservations,
    manager: state.restaurants.restaurant,
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    destroyReservation: id => dispatch(destroyReservation(id)),
    setCurrentModal: modal => dispatch(setCurrentModal(modal)),
    resetCurrentModal: () => dispatch(resetCurrentModal()),
    fetchUser: id => dispatch(fetchUser(id)),
    resetRestaurant: () => dispatch(resetRestaurant()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
