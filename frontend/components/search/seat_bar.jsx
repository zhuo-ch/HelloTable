import { connect } from 'react-redux';
import React from 'react';
import { setSearchParams } from '../../actions/search_actions';

class SeatBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
      targeted: 0,
    }
    this.getSeats = this.getSeats.bind(this);
    this.getCurrentSeat = this.getCurrentSeat.bind(this);
    this.targeted = this.targeted.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  handleKey(e) {
    if (this.state.selecting === true) {
      e.preventDefault();
      switch (e.key) {
        case 'Enter':
          this.props.setSearchParams({ seats: this.state.targeted });
          this.setState({ selecting: false })
          document.removeEventListener('keydown', this.handleKey);
          break;
        case 'ArrowUp':
          if (this.state.targeted > 1) {
            this.setState({ targeted: this.state.targeted - 1 });
          }
          break;
        case 'ArrowDown':
          if (this.state.targeted < 10) {
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
    if (e.currentTarget.className === 'seats') {
      this.setState({ selecting: true });
      document.addEventListener('keydown', this.handleKey);
    } else {
      this.props.setSearchParams({ seats: e.currentTarget.value });
      this.setState({ selecting: false });
      document.removeEventListener('keydown', this.handleKey);
    }
  }

  targeted(idx) {
    return idx === this.state.targeted ? 'highlight seats-item' : 'seats-item';
  }

  getSeats() {
    const selecting = this.state.selecting ? '' : 'hidden';
    let seats = [];

    for (let i = 1; i < 11; i++) {
      if (i === 1) {
        seats.push(
          <li
            className={ this.targeted(i) }
            key={i}
            value={i}
            onClick={ this.handleClick }>
            {i} Patron
          </li>
        );
      } else {
        seats.push(
          <li
            className={ this.targeted(i) }
            key={i}
            value={i}
            onClick={ this.handleClick }>
            {i} Patrons
          </li>
        );
      }
    }

    return (
      <ul className='search-list seats-list' id={ selecting }>
        { seats }
      </ul>
    )
  }

  getCurrentSeat() {
    const currentSeat = this.props.seats;

    return (
      <article className='seats' onClick={ this.handleClick }>
        { this.props.seats } Patrons
      </article>
    )
  }

  render() {
    const seats = this.getSeats();
    const currentSeat = this.getCurrentSeat();

    return (
      <section className='input bar-seats'>
        { currentSeat }
        { seats }
      </section>
    );
  }
}

const mapStateToProps = state => ({
    seats: state.search.searchParams.seats,
});

const mapDispatchToProps = dispatch => ({
  setSearchParams: query => dispatch(setSearchParams(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatBar);
