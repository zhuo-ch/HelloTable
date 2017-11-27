import React from 'react';
import { connect } from 'react-redux';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import {
  fetchManagerRestaurant,
  updateRestaurant,
  updateHours,
  updateSeating,
  createSeating,
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
    this.handleAddTables = this.handleAddTables.bind(this);
    this.handleAddTableSave = this.handleAddTableSave.bind(this);
    this.handleAddTablesChange = this.handleAddTablesChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchManagerRestaurant(this.props.currentUser.id);
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

  handleAddTables() {
    this.props.setCurrentModal({
      hidden: false,
      type: 'addTable',
    });
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

  getField(targeted, id, text) {
    if (targeted) {
      return ManagerUtil.createInput({
        cName: 'editable-input',
        placeHolder: text,
        changeHandler: this.handleChange,
        key: id,
        id
      });
    } else {
      return ManagerUtil.createSpan({
        key: id,
        cName: 'manager-text',
        text: text,
        clickHandler: this.handleClick,
      });
    }
  }

  getLi(article, key, targeted, cName) {
    return (
      <li key={ key } className={ cName }>
        { article }
        { targeted ?
          ManagerUtil.getEditButtons({
            onSave: this.handleSave,
            onCancel: this.handleClick,
            cName: 'horizontal'}) :
          ManagerUtil.getBlankArticle('horizontal')
        }
      </li>
    )
  }

  getDetails() {
    const restaurant = this.props.restaurant;
    const details = ['name', 'phone', 'address', 'cuisine', 'site'].map((key, idx) => {
      const listKey = `${key}`;
      const targeted = this.state.selecting && this.state.idx === listKey;
      const detail = this.getField(targeted, listKey, restaurant[key]);
      const article = (
        <article className='horizontal'>
          { `${key.charAt(0).toUpperCase() + key.slice(1, key.length)}:  ` }
          { detail }
        </article>
      );

      return this.getLi(article, listKey, targeted, 'horizontal');
    });

    return  ManagerUtil.createSection({
      id: 'Details',
      title: 'Details',
      liElements: details,
    });
  }

  getHour(hour, idx) {
    let targeted;
    const openClose = ['open', 'close'].map(el => {
      const listKey = `hours-${idx}-${el}-${hour[el]}`;
      const matched = this.state.idx === listKey;
      const text = formatHoursMinutes(hour[el]);
      targeted = targeted ? targeted : (this.state.selecting && matched);

      return this.getField(targeted && matched, listKey, text);
    });

    const article = (
      <article className='horizontal'>
        <span className='manager-text'>{ hour.day }</span>
        <span className='manager-text'>from</span>
        { openClose[0] }
        <span className='manager-text'>to</span>
        { openClose[1] }
      </article>
    );

    return this.getLi(article, hour.day, targeted, 'horizontal');
  }

  getTimes() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const times = this.props.restaurant.hours.map((hour, idx) => {
      return this.getHour(hour, idx);
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

      return this.getField(targeted && matched, key, text);
    });

    const article = (
        <article className='horizontal'>
          { maxSeats[0] }
          <span className='manager-text'>tables of</span>
          { maxSeats[1] }
        </article>
    );

    return this.getLi(article, idx, targeted, 'horizontal');
  }

  getSeating() {
    const seatings = this.props.restaurant.seatings.map((seating, idx) => this.getSeat(seating, idx));

    return ManagerUtil.createSection({
      id: 'Tables',
      title: 'Restaurant Tables',
      liElements: seatings,
      titleAddon: ManagerUtil.createButton('Add Tables', this.handleAddTables),
    });
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
  createSeating: seating => dispatch(createSeating(seating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
