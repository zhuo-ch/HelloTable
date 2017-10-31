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
    debugger
  }

  getDetails() {
    debugger
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
    debugger
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const times = days.map(day => {
      return (
        <li>
          <span>{ day }</span>
          <span>{ this.restaurant[day].open } to { this.restaurant[day].close }</span>
        </li>
      );
    });

    return (
      <ul>
        { times }
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

  getLimits() {

  }

  getEditButton() {

  }



  render() {
    return (
      <div>
        { this.getDetails() }

        { this.getLimits() }
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
