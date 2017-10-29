import React from 'react';
import { connect } from 'react-redux';
import * as SearchAPIUtil from '../../util/search_api_util';
import { setSearchParams } from '../../actions/search_actions';
import InputSelect from '../input_select.jsx';

class TimeBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
      targeted: 0,
      timeSlots: 0,
    }
    this.getSlots = this.getSlots.bind(this);
    // this.targeted = this.targeted.bind(this);
    // this.getTimeSlots = this.getTimeSlots.bind(this);
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
          this.props.setSearchParams({ time: this.getSlots()[this.state.targeted - 1] });
          this.setState({ selecting: false })
          document.removeEventListener('keydown', this.handleKey);
          break;
        case 'ArrowUp':
          if (this.state.targeted > 1) {
            this.setState({ targeted: this.state.targeted - 1 });
          }
          break;
        case 'ArrowDown':
          if (this.state.targeted < this.getSlots().length) {
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

  // targeted(idx) {
  //   return idx === this.state.targeted ? 'highlight time-item' : 'time-item';
  // }

  getSlots() {
    const time = this.props.time.split(':');
    let startTime = 1;
    let endTime = 12;
    let minutes = time[1] < 30 ? 0 : 30;
    let slots = new Array();

    if ((this.props.date === SearchAPIUtil.formatDate(new Date())) && (new Date().getHours() > 12)) {
      startTime = (new Date().getHours() % 12) + 1;
    }

    while (startTime < endTime) {
      slots.push(SearchAPIUtil.formatTime(startTime, minutes));
      minutes += 30;

      if (minutes === 60) {
        minutes = 0;
        startTime += 1;
      }
    }

    return slots;
  }

  // getTimeSlots() {
  //   const slots = this.getSlots();
  //
  //   return slots.map((slot, idx) => {
  //     return <li
  //       key={ idx+1 }
  //       className={ this.targeted(idx+1) }
  //       onClick={ this.handleClick }>{`${slot}`}</li>;
  //   });
  // }
  //
  // getTimeList() {
  //   const selecting = this.state.selecting ? '' : 'hidden';
  //   const timeSlots = this.getTimeSlots();
  //
  //   return (
  //     <ul className='search-list time-list' id={ selecting }>
  //       { timeSlots }
  //     </ul>
  //   )
  // }


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

    return InputSelect(options);
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
