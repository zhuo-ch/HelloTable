import React from 'react';
import { connect } from 'react-redux';
import * as SearchAPIUtil from '../../util/search_api_util';
import { setSearchParams } from '../../actions/search_actions';

class TimeBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
      targeted: 0,
      timeSlots: [],
    }
    this.getSlots = this.getSlots.bind(this);
    this.targeted = this.targeted.bind(this);
    this.getTimeList = this.getTimeList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const timeSlots = this.getSlots();
    this.setState({ timeSlots });
  }

  handleKey(e) {
    if (this.state.selecting === true) {
      e.preventDefault();
      switch (e.key) {
        case 'Enter':
          this.props.setSearchParams({ time: this.state.targeted });
          this.setState({ selecting: false })
          document.removeEventListener('keydown', this.handleKey);
          break;
        case 'ArrowUp':
          if (this.state.targeted > 1) {
            this.setState({ targeted: this.state.targeted - 1 });
          }
          break;
        case 'ArrowDown':
          if (this.state.targeted < this.state.timeSlots.length) {
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
    if (e.currentTarget.id === 'time') {
      this.setState({ selecting: true });
      document.addEventListener('keydown', this.handleKey);
    } else {
      this.setState({ selecting: false, targeted: e.currentTarget.innerText });
      this.props.setSearchParams({ time: e.currentTarget.innerText });
      document.removeEventListener('keydown', this.handleKey);
    }
  }

  targeted(idx) {
    return idx === this.state.targeted ? 'highlight time-item' : 'time-item';
  }

  getSlots() {
    const time = this.props.time.split(':');
    let startTime = 1;
    let endTime = 12;
    let minutes = time[1] < 30 ? 0 : 30;
    let slots = new Array();

    if (this.props.date === SearchAPIUtil.formatDate(new Date())) {
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

    return slots.map((slot, idx) => {
      return <li
        key={ idx+1 }
        className={ this.targeted(idx+1) }
        onClick={ this.handleClick }>{`${slot}`}</li>;
    });
  }

  getTimeList() {
    const selecting = this.state.selecting ? '' : 'hidden';

    return (
      <ul className='search-list time-list' id={ selecting }>
        { this.state.timeSlots }
      </ul>
    )
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

    return (
      <section className='input bar-time'>
        { currentTime }
        { timeSlots }
      </section>
    )
  }
}

const mapStateToProps = state => ({
    time: state.search.searchParams.time,
    date: state.search.searchParams.date,
});

const mapDispatchToProps = dispatch => ({
  setSearchParams: query => dispatch(setSearchParams(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeBar);
