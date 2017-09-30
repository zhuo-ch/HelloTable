import React from 'react';
import ReactStars from 'react-stars';
import { createReview } from '../../actions/review_actions';
import { resetCurrentModal, setCurrentModal } from '../../actions/modal_actions';
import { connect }from 'react-redux';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.ratings = {
      rating: 0,
      food: 0,
      service: 0,
      ambiance: 0,
      value: 0,
      details: ''
    };
    this.handleRating = this.handleRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleError() {
    setTimeout(() => this.props.setCurrentModal({ hidden: false, type: 'reviewForm'}), 500);
  }

  handleSubmit(e) {
    e.preventDefault();
    const review = Object.assign({}, this.ratings, {reservation_id: parseInt(this.props.reservation)});
    this.props.createReview(review);
  }

  handleRating(newRating) {
    this.ratings.rating = newRating;
  }

  handleChange(e) {
    if (e.currentTarget.name === 'details') {
      this.ratings.details = e.currentTarget.value;
    } else {
      this.ratings[e.currentTarget.name.toLowerCase()] = parseInt(e.currentTarget.value);
    }
  }

  getSelect(selectType) {
    return (
      <select name={selectType} onChange={this.handleChange}>
        <option value='0' selected disabled>--{selectType}--</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
    )
  }

  starsSelector() {
    return (
      <section className='review-rating'>
        <section className='overall-stars'>
          <h4>Rating</h4>
          <ReactStars
            count={5}
            size={20}
            half={false}
            onChange={this.handleRating}
            />
        </section>
        <ul className='ratings-drop-section'>
          <li className='rating-drop'>
            {this.getSelect('Food')}
          </li>
          <li className='rating-drop'>
            {this.getSelect('Service')}
          </li>
          <li className='rating-drop'>
            {this.getSelect('Ambiance')}
          </li>
          <li className='rating-drop'>
            {this.getSelect('Value')}
          </li>
        </ul>
      </section>
    )
  }

  render() {
    return (
      <div className='review-form-container'>
        { this.starsSelector() }
        <form className='review-form'>
          <textarea
            onChange={this.handleChange}
            className='review-details'
            placeholder={`Share your experience`}
            name='details'
            />
          <button className='button' onClick={this.handleSubmit}>Share</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    reservation: state.modal.reservation,
  });
}

const mapDispatchToProps = dispatch => ({
  createReview: review => dispatch(createReview(review)),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
