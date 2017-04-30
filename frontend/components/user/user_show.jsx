import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import FontAwesome from 'react-fontawesome';
import ReservationsSnippet from '../restaurant/reservations';
import Scrollchor from 'react-scrollchor';
import RestaurantSnippet from '../restaurant/restaurant_snippet';

class UserShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (parseInt(this.props.routeParams.userId) !== this.props.currentUser.id) {
      this.props.router.push('/');
    } else {
      this.props.fetchUser(this.props.currentUser.id, )
    }
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

  setUpcoming(reservation) {
    const curDate = new Date();
    const resDate = reservation.date.split("-").map((str) => parseInt(str));
    const resTime = this.formatTime(reservation.time).split(':');
    const newDate = new Date(resDate[2], resDate[0]-1, resDate[1], resTime[0]+12, resTime[1]);
    return newDate > curDate;
  }

  render() {
    const Upcoming = this.props.user.reservations.filter(reservation => this.setUpcoming(reservation))
      .map((restaurant, idx) => {
        return (
          <section key={idx}>
            <article className='new-res'>
              <h4>
                A table for {restaurant.seats} will be set at {this.formatTime(restaurant.time)} on {this.formatDate(restaurant.date)}
              </h4>
            </article>
            <RestaurantSnippet restaurant={restaurant}/>
          </section>
        );
      })

    const Previous = this.props.user.reservations.filter(reservation => !this.setUpcoming(reservation))
      .map((restaurant, idx) => {
        return (
          <section key={idx}>
            <article className='new-res'>
              <h4>
                We hope you enjoyed your visit on {this.formatDate(restaurant.date)}
              </h4>
            </article>
            <RestaurantSnippet restaurant={restaurant}/>
          </section>
        );
      })
    // const UserNav = (
    //     <ul>
    //       <
    //     </ul>
    // )

    return(
      <div className='user-show'>
        <section className='user-show-splash'><h2>{currentUser.username}</h2></section>
        <div className='user-show-body'>
          <div className='user-show-nav'>
            <ul>
              <li className='user-nav-options'>
                <Scrollchor to='#up-res'><h3>Upcoming Reservation</h3></Scrollchor>
              </li>
              <li>
                <Scrollchor to='#prev-res'><h3>Previous Reservations</h3></Scrollchor>
              </li>
            </ul>
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
    user: state.user,
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    fetchUser: id => dispatch(fetchUser(id)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
