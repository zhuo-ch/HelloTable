import React from 'react';
import ReactStars from 'react-stars';
import { createReview } from '../../actions/review_actions';
import { connect }from 'react-redux';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      food: 0,
      service: 0,
      ambiance: 0,
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createReview;
  }

  handleChange(newRating) {
    this.state.value = newRating;
  }

  overallStars() {
    return (
      <section className='overall-stars'>
        <ReactStars
          count={5}
          size={20}
          half={false}
          onChange={this.handleChange}
          />
      </section>
    )
  }

  render() {
    return (
      <div className='review-form-container'>
        { this.overallStars() }
        <form className='review-form'>
          <textarea
            className='review-details'
            placeholder={`Share your experience`}
            name='details'
            />
          <button className='button' onclick={this.handleSubmit}>Submit Review</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    reservation: state.modal.reservation,
  });
}

const mapDispatchToProps = dispatch => ({
  createReview: review => createReview(review),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
