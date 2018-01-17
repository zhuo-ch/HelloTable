import React from 'react';
import { connect } from 'react-redux';
import { setSearchParams } from '../../actions/search_actions';
import * as SearchUtil from '../../util/search_util';
import * as DateUtil from '../../util/date_util';

class TimeBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
      targeted: 0,
      timeSlots: 0,
    }
    this.getSlots = this.getSlots.bind(this);
    this.getTimeList = this.getTimeList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleOutsideClick(e) {
    e.preventDefault();
    this.setState({ selecting: false });
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey(e) {
    if (this.state.selecting === true) {
      e.preventDefault();
      switch (e.key) {
        case 'Enter':
          this.props.setSearchParams({ time: this.getSlots()[this.state.targeted] });
          this.setState({ selecting: false })
          document.removeEventListener('keydown', this.handleKey);
          break;
        case 'ArrowUp':
          if (this.state.targeted > 0) {
            this.setState({ targeted: this.state.targeted - 1 });
          }
          break;
        case 'ArrowDown':
          if (this.state.targeted < this.getSlots().length - 1) {
            this.setState({ targeted: this.state.targeted + 1 });
          }
          break;
        default:
          break;
      }
    }
  }

  handleClick(e) {
    e.preventDefault();

    if (e.currentTarget.className === 'time') {
      this.setState({ selecting: true });
      document.addEventListener('keydown', this.handleKey);
    } else {
      this.setState({ selecting: false, targeted: e.currentTarget.innerText ? e.currentTarget.innerText : 0 });
      this.props.setSearchParams({ time: e.currentTarget.innerText });
      document.removeEventListener('keydown', this.handleKey);
    }
  }

  isCurrentDate() {
    return this.props.date === DateUtil.getNewDate();
  }

  getStartTime() {
    if (!this.isCurrentDate()) {
      return { start: 13, minutes: 0 };
    } else {
      const newTime = DateUtil.timeToArr(DateUtil.getNewTime());
      const hour = newTime[newTime.length - 1] === 'PM' ? parseInt(newTime[0]) + 12 : parseInt(newTime[0]);
      if (newTime[1] < 30) {
        return { start: hour, minutes: 30 };
      } else {
        return { start: hour + 1, minutes: 0 };
      }
    }
  }

  getSlots() {
    const time = this.getStartTime();
    const endTime = 24;
    let slots = new Array();

    while (time.start < endTime) {
      const hour = time.start > 11 ? time.start - 12 : time.start
      const timeSlot = DateUtil.formatHoursMinutes(hour, time.minutes);
      const pm = time.start > 11 ? ' PM' : ' AM';
      slots.push(timeSlot + pm);
      time.minutes = time.minutes === 0 ? 30 : 0;
      time.start = time.minutes === 0 ? time.start + 1 : time.start;
    }

    return slots;
  }

  getTimeList() {
    const options = {
      selecting: this.state.selecting,
      targetIdx: this.state.targeted,
      handleClick: this.handleClick,
      items: this.getSlots(),
      text: '',
      listName: ['search', 'time'],
      type: 'time-item',
    }

    return SearchUtil.inputSelect(options);
  }

  getCurrentTime() {
    return (
      <article className='time' id='time' onClick={ this.handleClick }>
        { this.props.time }
      </article>
    )
  }

  render() {
    const timeSlots = this.getTimeList();
    const currentTime = this.getCurrentTime();
    const cName = this.props.restaurantId ? 'input bar-time res-present' : 'input bar-time';
    const wrapper = this.state.selecting ? '' : 'hidden';

    return (
      <section className={ cName }>
        <div className='input-wrapper' id={ wrapper } onClick={ this.handleOutsideClick }></div>
        { currentTime }
        { timeSlots }
      </section>
    )
  }
}

const mapStateToProps = state => ({
    time: state.search.searchParams.time,
    date: state.search.searchParams.date,
    timeSlots: state.search.searchParams.timeSlots,
    restaurantId: state.restaurants.restaurant.id,
});

const mapDispatchToProps = dispatch => ({
  setSearchParams: query => dispatch(setSearchParams(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeBar);
