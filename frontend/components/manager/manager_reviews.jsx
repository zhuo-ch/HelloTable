import React from 'react';
import * as ManagerUtil from '../../util/manager_util';
import { formatHoursMinutes, formatDate } from '../../util/search_util';
import ReviewSnippet from '../review/review_snippet';

export default ({ reviews }) => {
  const reviewList = reviews.map(review => <ReviewSnippet review={ review } key={ review.id }/>);

  return ManagerUtil.createSection({
    id: 'Reviews',
    title: 'Reviews',
    liElements: reviewList,
  });
}
