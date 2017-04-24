import React from 'react';
import { Link } from 'react-router';

const RestaurantSnippet = ({restaurant}) => {
  // const imgStyle = {backgroundImage: `url("${restaurant.image}")`}
  return (
    <section className='snippet-section'>
      <Link to={`restaurant/${restaurant.id}`} className='snippet-photo'>
        <article className='snippet-img'>
          <img src={restaurant.image}/>
        </article>
      </Link>
      <article className='snippet-info'>
        <h4>
          <Link to={`restaurant/${restaurant.id}`}>
            {restaurant.restaurant_name}
          </Link>
        </h4>
        <h4>Ratings</h4>
        <h4 className="detail-fade">{restaurant.cuisine} | {restaurant.city_name}, {restaurant.state}</h4>
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
