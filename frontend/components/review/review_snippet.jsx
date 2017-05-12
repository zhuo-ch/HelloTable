import React from 'react';
import { Link } from 'react-router';
import ReactStars from 'react-stars';

const RestaurantSnippet = ({review}) => {
  const stars = (<ReactStars
                  count={5}
                  edit={false}
                  value={review.rating}
                  />);

  return (
    <div className='snippet-section'>
      <section className='review-snippet-main'>
        <article className='review-snippet-top-bar'>
          <ul>
            <li>{ stars }</li>
            <li>Reviewed by: { review.username }</li>
            <li>Reviewed on: { review.date }</li>
          </ul>
        </article>
        <article className='review-description'>
          {review.description}
        </article>
      </section>
      <section className='review-snippet-right-bar'>
        <ul>
          <li>Rating: <span>{review.rating}</span></li>
          <li>Food: <span>{review.food}</span></li>
          <li>Service: <span>{review.service}</span></li>
          <li>Ambiance: <span>{review.ambiance}</span></li>
          <li>Value: <span>{review.value}</span></li>
        </ul>
      </section>
    </div>
  )
}

export default RestaurantSnippet;
