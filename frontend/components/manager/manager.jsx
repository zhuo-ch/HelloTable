import React from 'react';
import { connect } from 'react-redux';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import { fetchManagerRestaurant } from '../../actions/manager_actions';
import { StickyContainer, Sticky } from 'react-sticky';
import { formatHoursMinutes } from '../../util/search_api_util';
import RestaurantMap from '../restaurant/restaurant_map';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selecting: false, idx: '', val: '' }
    this.handleSideBar = this.handleSideBar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchManagerRestaurant(this.props.currentUser.id);
  }

  handleSideBar(e) {
    const reference = document.getElementById(e.currentTarget.innerText);
    reference.scrollIntoView(true);
  }

  handleClick(e) {
    const selecting = this.state.selecting ? false : true;
    this.setState({ selecting: selecting, idx: e.currentTarget.id });
  }

  handleChange(e) {
  }

  createSaveButton() {
    return (
        <button className='button'>Save Changes</button>
    );
  }

  createSpan({key, cName, text, clickHandler}) {
    return (
      <span
        onClick={ clickHandler }
        key={ key }
        id={ key }
        className={ cName }>
        { text }
      </span>
    );
  }

  createInput({key, cName, changeHandler, placeHolder}) {
    return (
      <input
        onChange={ changeHandler }
        key={ key }
        id={ key }
        className={ cName }
        placeholder={ placeHolder }>
      </input>
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
    const restaurant = this.props.restaurant;
    const details = ['name', 'phone', 'address', 'cuisine', 'site'].map((key, idx) => {
      const detail = this.createSpan({
        key: idx,
        cName: 'about-description',
        text: restaurant[key],
        clickHandler: this.handleClick,
      });

      return (
        <article className='about-description' key={ idx }>
          { `${key.charAt(0).toUpperCase() + key.slice(1, key.length)}:  ` }{ detail }
        </article>
      );
    });

    return (
      <section className='restaurant-about about-text' id='Details'>
        <article className='user-show-res-header'><h2>Details</h2></article>
          { details }
      </section>
    );
  }

  getTimes() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const times = this.props.restaurant.hours.map(hour => {
      const openClose = ['open', 'close'].map(el => {
        return this.createSpan({
          key: hour.day + '-' + el,
          text: formatHoursMinutes(hour[el]),
          clickHandler: this.handleClick,
        });
      });

      return (
        <li key={ hour.day } className='about-description'>
          { hour.day }  from  { openClose[0] }  to  { openClose[1] }
        </li>
      );
    });

    return (
      <section className='restaurant-about about-text' id='Hours of Operation'>
        <article className='user-show-res-header'><h2>Restaurant Hours</h2></article>
        <ul>
          { times }
        </ul>
      </section>
    );
  }

  getSeat(seating, idx) {
    let targeted;
    const maxSeats = ['max_tables', 'seats'].map(el  => {
      const key = `${el}${idx}`;
      const text = seating[el];
      targeted = (this.state.selecting && this.state.idx === key);

      if (targeted) {
        return this.createInput({
          cName: 'editable-input',
          placeHolder: text,
          changeHandler: this.handleChange,
          key,
        });
      } else {
        return this.createSpan({
          clickHandler: this.handleClick,
          cName: 'about-description',
          key,
          text,
        });
      }
    });

    return (
      <li key={idx} className='res-avail-list'>
        { maxSeats[0] }
        tables of
        { maxSeats[1] }
        { targeted ? this.createSaveButton() : ''}
      </li>
    );
  }

  getSeating() {
    const seatings = this.props.restaurant.seatings.map((seating, idx) => this.getSeat(seating, idx));

    return (
      <section className='restaurant-about' id='Tables'>
        <article className='user-show-res-header'><h2>Restaurant Tables</h2></article>
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
    const rightBar = this.getRightBar();

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
  restaurant: state.manager,
});

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  fetchManagerRestaurant: id => dispatch(fetchManagerRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
