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
          this.props.setSearchParams({ time: DateUtil.timeStringToInt(this.getSlots()[this.state.targeted]) });
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
      debugger
      this.props.setSearchParams({ time: DateUtil.timeStringToInt(e.currentTarget.innerText) });
      document.removeEventListener('keydown', this.handleKey);
    }
  }

  isCurrentDate() {
    return this.props.date === DateUtil.dateToString(new Date());
  }

  getStartTime() {
    if (!this.isCurrentDate()) {
      return { startTime: 13, minutes: 0, endTime: 24 };
    } else {
      const timeString = DateUtil.format12Hour(DateUtil.timeStringToInt(DateUtil.getNewTime()));
      const newTime = DateUtil.timeToArr(timeString);
      const hour = newTime[newTime.length - 1] === 'PM' ? parseInt(newTime[0]) + 12 : parseInt(newTime[0]);

      if (newTime[1] < 30) {
        return { startTime: hour, minutes: 30, endTime: 24 };
      } else {
        return { startTime: hour + 1, minutes: 0, endTime: 24 };
      }
    }
  }

  getSlots() {
    const time = this.getStartTime();

    return DateUtil.genTimeSlots(time);
  }

  getTimeList(slots) {
    const options = {
      selecting: this.state.selecting,
      targetIdx: this.state.targeted,
      handleClick: this.handleClick,
      items: slots,
      text: '',
      listName: ['search', 'time'],
      type: 'time-item',
    }

    return SearchUtil.inputSelect(options);
  }

  getCurrentTime() {
    return (
      <article className='time' id='time' onClick={ this.handleClick }>
        { this.props.time ? DateUtil.format12Hour(this.props.time) : this.state.targeted }
      </article>
    )
  }

  render() {
    const slots = this.getSlots()
    const timeSlots = this.getTimeList(slots);
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
