import React from 'react';
import { connect } from 'react-redux';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import {
  fetchManagerRestaurant,
  updateRestaurant,
  updateHours,
  updateSeating
} from '../../actions/manager_actions';
import { StickyContainer, Sticky } from 'react-sticky';
import { formatHoursMinutes } from '../../util/search_api_util';
import RestaurantMap from '../restaurant/restaurant_map';
import { merge } from 'lodash';
import * as ManagerUtil from '../../util/manager_util';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selecting: false, idx: '', value: '' }
    this.handleSideBar = this.handleSideBar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillMount() {
    this.props.fetchManagerRestaurant(this.props.currentUser.id);
  }

  handleError() {

  }

  handleSideBar(e) {
    e.preventDefault();
    const reference = document.getElementById(e.currentTarget.innerText);
    reference.scrollIntoView(true);
  }

  handleClick(e) {
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

    this.handleClick();
    setTimeout(this.props.resetCurrentModal, 300);
  }

  handleUpdateSeating(idx) {
    let seating = merge({}, this.props.restaurant.seatings[idx[1]]);
    seating[idx[2]] = parseInt(this.state.value);
    this.props.updateSeating(seating);
  }

  handleUpdateHour(idx) {
    let hour = merge({}, this.props.restaurant.hours[idx[1]]);
    hour[idx[2]] = ManagerUtil.to24(this.state.value);
    this.props.updateHours(hour);
  }

  handleUpdateRestaurant(idx) {
    let dupRestaurant = merge({}, this.props.restaurant);
    dupRestaurant[idx] = this.state.value;
    this.props.updateRestaurant(dupRestaurant);
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
      const listKey = `${key}`;
      const targeted = this.state.selecting && this.state.idx === listKey;
      let detail;

      if (targeted) {
        detail = ManagerUtil.createInput({
          cName: 'editable-input',
          id: listKey,
          placeHolder: restaurant[key],
          changeHandler: this.handleChange,
          key: listKey,
        });
      } else {
        detail = ManagerUtil.createSpan({
          key: listKey,
          cName: 'manager-text',
          text: restaurant[key],
          clickHandler: this.handleClick,
        });
      }

      return (
        <li className='horizontal' key={ idx }>
          <article className='horizontal'>
            { `${key.charAt(0).toUpperCase() + key.slice(1, key.length)}:  ` }
            { detail }
          </article>
          <article className='horizontal'>
            { targeted ? ManagerUtil.createButton('Save', this.handleSave) : '' }
            { targeted ? ManagerUtil.createButton('Cancel', this.handleClick) : '' }
          </article>
        </li>
      );
    });

    return  ManagerUtil.createSection({
      id: 'Details',
      title: 'Details',
      liElements: details,
    });
  }

  getTimes() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const times = this.props.restaurant.hours.map((hour, idx) => {
      let targeted;
      const openClose = ['open', 'close'].map(el => {
        const listKey = `hours-${idx}-${el}-${hour[el]}`;
        const matched = this.state.idx === listKey;
        targeted = targeted ? targeted : (this.state.selecting && matched);

        if (targeted && matched) {
          return ManagerUtil.createInput({
            changeHandler: this.handleChange,
            key: listKey,
            id: listKey,
            cName: 'editable-input',
            placeHolder: formatHoursMinutes(hour[el]),
          });
        } else {
          return ManagerUtil.createSpan({
            key: listKey,
            text: formatHoursMinutes(hour[el]),
            clickHandler: this.handleClick,
          });
        }
      });

      return (
        <li key={ hour.day } className='horizontal'>
          <article className='horizontal'>
            <span className='manager-text'>{ hour.day }</span>
            <span className='manager-text'>from</span>
            { openClose[0] }
            <span className='manager-text'>to</span>
            { openClose[1] }
          </article>
          <article className='horizontal'>
            { targeted ? ManagerUtil.createButton('Save', this.handleSave) : ''}
            { targeted ? ManagerUtil.createButton('Cancel', this.handleClick) : ''}
          </article>
        </li>
      );
    });

    return ManagerUtil.createSection({
      id: 'Hours of Operation',
      title: 'Restaurant Hours',
      liElements: times,
    });
  }

  getSeat(seating, idx) {
    let targeted;
    const maxSeats = ['max_tables', 'seats'].map(el  => {
      const key = `seatings-${idx}-${el}`;
      const text = seating[el];
      const matched = this.state.idx === key;
      targeted = targeted ? targeted : (this.state.selecting && matched);

      if (targeted && matched) {
        return ManagerUtil.createInput({
          cName: 'editable-input',
          placeHolder: text,
          changeHandler: this.handleChange,
          key,
        });
      } else {
        return ManagerUtil.createSpan({
          clickHandler: this.handleClick,
          cName: 'manager-text',
          key,
          text,
        });
      }
    });

    return (
      <li key={idx} className='horizontal'>
        <article className='horizontal'>
          { maxSeats[0] }
          <span className='manager-text'>tables of</span>
          { maxSeats[1] }
        </article>
        <article className='horizontal'>
          { targeted ? ManagerUtil.createButton('Save', this.handleSave) : '' }
          { targeted ? ManagerUtil.createButton('Cancle', this.handleClick) : '' }
        </article>
      </li>
    );
  }

  getSeating() {
    const seatings = this.props.restaurant.seatings.map((seating, idx) => this.getSeat(seating, idx));

    return ManagerUtil.createSection({
      id: 'Tables',
      title: 'Restaurant Tables',
      liElements: seatings,
    });
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
  updateRestaurant: restaurant => dispatch(updateRestaurant(restaurant)),
  updateSeating: seating => dispatch(updateSeating(seating)),
  updateHours: hour => dispatch(updateHours(hour)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
