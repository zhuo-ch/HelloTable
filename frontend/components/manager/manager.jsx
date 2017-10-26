import React from 'react';
import { connect } from 'react-redux';
import Modal from '../modal.jsx';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false,
      times: false,
      limits: false,
    }
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
    const times = days.map(day => {
      return (
        <span>{ day }</span>
        <span>{ open } to { closing }</span>
      );
    });

    return (
      <ul>
        { times }
      </ul>
    );
  }

  getLimits() {

  }

  getEditButton() {

  }



  render() {
    return (
      <div>
        { getDetails }
        { getTimes }
        { getLimits }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  restaurant: state.Manager.restaurant,
});

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  fetchManagerRestaurant: id => dispatch(fetchManagerRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
