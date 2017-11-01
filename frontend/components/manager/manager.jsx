import React from 'react';
import { connect } from 'react-redux';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import { fetchManagerRestaurant } from '../../actions/manager_actions';

class Manager extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchManagerRestaurant(this.props.currentUser.id);
  }

  getDetails() {
    const restaurant = this.props.restaurant;

    return (
      <section className='manager-details'>
        <article>{ restaurant.name }</article>
        <article>{ restaurant.phone }</article>
        <article>{ restaurant.address }</article>
        <article>{ restaurant.cuisine }</article>
        <article>{ restaurant.site }</article>
      </section>
    );
  }

  getTimes() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const times = this.props.restaurant.hours.map(hour => {
      return (
        <li>
          <span>{ hour.day }</span>
          <span>{ hour.open } to { hour.close }</span>
        </li>
      );
    });

    return (
      <ul>
        { times }
      </ul>
    );
  }

  getSeating() {
    const seatings = this.props.restaurant.seatings.map(seating => {
      return (
        <li>
          <span>{ seating.seats }</span>
          <span>{ seating.max_tables }</span>
        </li>
      );
    });

    return (
      <ul>
        { seatings }
      </ul>
    );
  }

  getTimesList() {
    const list = { '12:00AM': 0, '12:30AM': 30 };
    let hours = 100;
    let mins = 0;

    while (hours < 2400) {
      const str = hours.toString();
      const hour = str.slice(0, -2);
      const min = str.slice(-2, str.length);
      const type = hours > 11 ? 'PM' : 'AM';
      list[`${hour}:${min}${type}`] = hours + min;
      mins = mins === 30 ? 0 : 30;
    }

    return list;
  }

  getEditButton() {

  }

  render() {
    const loaded = this.props.restaurant.id ? true : false;
    const details = loaded ? this.getDetails() : '';
    const times = loaded ? this.getTimes() : '';
    const seatings = loaded ? this.getSeating() : '';

    return (
      <div>
        { details }
        { times }
        { seatings }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  restaurant: state.manager,
});

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  fetchManagerRestaurant: id => dispatch(fetchManagerRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
