import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { destroyReservation } from '../../actions/session_actions';
import FontAwesome from 'react-fontawesome';
import ReservationsSnippet from '../restaurant/reservations';
import Scrollchor from 'react-scrollchor';
import RestaurantSnippet from '../restaurant/restaurant_snippet';
import { StickyContainer, Sticky } from 'react-sticky';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import { formatTime, formatDate } from '../../selectors/date_selectors';

class UserShow extends React.Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
  }

  componentWillMount() {
    if (parseInt(this.props.routeParams.userId) !== this.props.currentUser.id) {
      this.props.router.push('/');
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.destroyReservation(e.currentTarget.value);
  }

  handleAddReview(e) {
    e.preventDefault();
    this.props.setCurrentModal({hidden: false, type:'reviewForm', reservation: e.currentTarget.value});
  }

  setUpcoming(reservation) {
    const curDate = new Date();
    const resDate = reservation.date.split("-").map((str) => parseInt(str));
    const resTime = this.props.formatTime(reservation.time).split(':').map((str) => parseInt(str));
    const newDate = new Date(resDate[2], resDate[0]-1, resDate[1], resTime[0]+12, resTime[1]);
    return newDate > curDate;
  }

  getUpcoming() {
    const reservations = this.props.reservations.filter(reservation => this.setUpcoming(reservation));

    return (
      reservations.map((reservation) => {
        return (
          <section className='show-res' key={reservation.id}>
            <article className='user-res'>
              <h4>
                A table for {reservation.seats} will be set at {this.props.formatTime(reservation.time)} on {this.props.formatDate(reservation.date)}
              </h4>
              <button onClick={ this.handleCancel } className='button' value={reservation.id}>Cancel</button>
            </article>
            <RestaurantSnippet restaurant={reservation.restaurant}/>
          </section>
        );
      }));
  }

  getPrevious() {
    const previous = this.props.reservations.filter(reservation => !this.setUpcoming(reservation));

    return (
      previous.map((reservation) => {
        const leaveReviewButton = reservation.reviewed ? '' : (
          <button className='button' value={ reservation.id } onClick={this.handleAddReview}>Review</button>
        );
        return (
          <section className='show-res' key={reservation.id}>
            <article className='user-res'>
              <h4>
                We hope you enjoyed your visit on {this.props.formatDate(reservation.date)}
              </h4>
              {leaveReviewButton}
            </article>
            <RestaurantSnippet restaurant={reservation.restaurant}/>
          </section>
        );
      })
    );
  }

  getFavorites() {
    return Object.keys(this.props.favorites).map(key => {
      return (
        <section className='show-fav' key={key}>
          <RestaurantSnippet restaurant={this.props.favorites[key].restaurant} />
        </section>
      );
    });
  }

  render() {
    const Upcoming = this.getUpcoming();
    const Previous = this.getPrevious();
    const Favorites = this.getFavorites();

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
    favorites: state.favorites,
    reservations: state.reservations.userReservations,
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    destroyReservation: id => dispatch(destroyReservation(id)),
    setCurrentModal: modal => dispatch(setCurrentModal(modal)),
    resetCurrentModal: () => dispatch(resetCurrentModal()),
    formatDate: date => formatDate(date),
    formatTime: time => formatTime(time),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
