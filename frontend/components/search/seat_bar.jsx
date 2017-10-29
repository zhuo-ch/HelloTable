import { connect } from 'react-redux';
import React from 'react';
import { setSearchParams } from '../../actions/search_actions';
import InputSelect from '../input_select.jsx';

class SeatBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
      targeted: 0,
      max: 10,
    }
    this.getSeats = this.getSeats.bind(this);
    this.getCurrentSeat = this.getCurrentSeat.bind(this);
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

  getSeats() {
    const options = {
      selecting: this.state.selecting,
      targetIdx: this.state.targeted,
      handleClick: this.handleClick,
      items: Array.from(Array(10)).map((el, idx) => idx + 1),
      text: 'Patrons',
      listName: ['search', 'seat'],
      type: 'seats-item',
    }

    return InputSelect(options);
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
    const wrapper = this.state.selecting ? '' : 'hidden';

    return (
      <section className='input bar-seats'>
        <div className='input-wrapper' id={ wrapper } onClick={ this.handleOutsideClick }></div>
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
  inputSelect: options => dispatch(inputSelect(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatBar);
