import React from 'react';
import { connect } from 'react-redux';
import * as ManagerUtil from '../../util/manager_util';
import ReviewSnippet from '../review/review_snippet';

class ManagerReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  getReviewsList() {
    return this.props.reviews.map(review => <ReviewSnippet review={ review } key={ review.id }/>);
  }

  getReviewsSection() {
    const reviewsList = this.getReviewsList();

    return ManagerUtil.createSection({
      id: 'Reviews',
      title: 'Reviews',
      liElements: reviewsList,
    });
  }

  render() {
    const reviewsSection = this.getReviewsSection();

    return reviewsSection;
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews.reviews,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerReviews);
