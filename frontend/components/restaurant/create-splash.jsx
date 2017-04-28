import React from 'react';
import { Link } from 'react-router';

const CreateRestaurantSplash = () => {

  return (
    <div className='create-splash'>
      <section>
        <Link to='/create' className='splash-create-button button'>Add your Table</Link>
      </section>
    </div>
  )
}

export default CreateRestaurantSplash;
