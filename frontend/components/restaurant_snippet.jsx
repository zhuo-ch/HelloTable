import React from 'react';
import { Link } from 'react-router';

const RestaurantSnippet = ({restaurant}) => {
  
  return (
    <section className='snippet-section'>
      <article className='snippet-photo'>
        <h3>Photo</h3>
      </article>
      <article className='snippet-info'>
        <h4>{restaurant.restaurant_name}</h4>
        <h4>Ratings</h4>
        <h4>{restaurant.cuisine} | City</h4>
      </article>
      <article className='snippet-price'>
        <h4>Dollar Signs</h4>
      </article>
      <article className='snippet-review'>
        <p>This is a sample review</p>
      </article>
    </section>
  )
}

export default RestaurantSnippet;
