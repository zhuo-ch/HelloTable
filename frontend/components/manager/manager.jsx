import React from 'react';
import { connect } from 'react-redux';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import { fetchManagerRestaurant } from '../../actions/manager_actions';
import { StickyContainer, Sticky } from 'react-sticky';
import { formatHoursMinutes } from '../../util/search_api_util';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selecting: false, type: '', idx: '' }
    this.handleSideBar = this.handleSideBar.bind(this);
    this.getTimes = this.getTimes.bind(this);
  }

  componentWillMount() {
    this.props.fetchManagerRestaurant(this.props.currentUser.id);
  }

  handleSideBar(e) {
    const reference = document.getElementById(e.currentTarget.innerText);
    reference.scrollIntoView(true);
  }

  createSpan({key, cName, text, clickHandler}) {
    return (
      <span
        onClick={ clickHandler }
        key={ key }
        className={ cName }>
        { text }
      </span>
    );
  }

  getSideBar() {
    const bar = ['Details', 'Hours of Operation', 'Tables'].map((el, idx) =>{
      return (
        <article
          key={ idx }
          className='about-description'
          onClick={ this.handleSideBar }>
          { el }
        </article>
      );
    });

    return (
      <Sticky>
        { bar }
      </Sticky>
    )
  }

  getDetails() {
    const restaurant = this.props.restaurant;
    const details = ['name', 'phone', 'address', 'cuisine', 'site'].map((key, idx) => {
      const detail = this.createSpan({
        key: idx,
        cName: 'about-description',
        text: restaurant[key],
        clickHandler: this.handleSideBar,
      });

      return (
        <article className='about-description' key={ idx }>
          { `${key.charAt(0).toUpperCase() + key.slice(1, key.length)}:  ` }{ detail }
        </article>
      );
    });

    return (
      <section className='restaurant-about about-text' id='Details'>
        <article className='about-header'><h2>Details</h2></article>
          { details }
      </section>
    );
  }

  getTimes() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const times = this.props.restaurant.hours.map(hour => {
      const open = this.createSpan({
        key: `${hour.day}-open`,
        text: formatHoursMinutes(hour.open),
        cName: 'about-description',
      });
      const close = this.createSpan({
        key: `${hour.day}-close`,
        text: formatHoursMinutes(hour.close),
        cName: 'about-description',
      });

      return (
        <li key={ hour.day } className='about-description'>
          { hour.day } from { open } to { close }
        </li>
      );
    });

    return (
      <section className='restaurant-about about-text' id='Hours of Operation'>
        <article className='about-header'><h2>Restaurant Hours</h2></article>
        <ul>
          { times }
        </ul>
      </section>
    );
  }

  getSeating() {
    const seatings = this.props.restaurant.seatings.map((seating, idx) => {
      return (
        <li key={idx} className='about-description'>
          { seating.max_tables + ' tables of ' + seating.seats }
        </li>
      );
    });

    return (
      <section className='restaurant-about' id='Tables'>
        <article className='about-header'><h2>Restaurant Tables</h2></article>
        <ul>
          { seatings }
        </ul>
      </section>
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
    const sideBar = this.getSideBar();

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
          </div>
        </div>
      </StickyContainer>
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
