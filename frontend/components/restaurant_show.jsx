import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchRestaurant } from '../actions/restaurant_actions';

class RestaurantShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    debugger
    this.props.fetchRestaurant(this.props.restaurantId);
  }

  render() {
    debugger
    return (
      <div className='restaurant-view'>
        <section className='restaurant-splash'>
          <div className='restaurant-splash-img'>

          </div>

          <div className='splash-details'>
            <section className="splash-name">{this.props.restaurant.restaurant_name}</section>
            <section className="splash-ratings">
              {}
            </section>
            <section className='splash-info'>
              {this.props.restaurant.cuisine}
              {this.props.restaurant.location}
            </section>
          </div>
        </section>

        <section className='restaurant-left'>
          <h3>About</h3>
          <h3>Photos</h3>
          <h3>Reviews</h3>
        </section>

        <section className='restaurant-mid'>
          <article className='restaurant-about'>
            <h3>About</h3>
            {this.props.restaurant.description}
          </article>
        </section>

        <section className='restaurant-right'>
          {this.props.restaurant.hours}
          {this.props.restaurant.restaurant_number}
          {this.props.restaurant.cuisine}
          {this.props.restaurant.site}
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, {params}) => {
  const restaurantId = parseInt(params.restaurantId);
  // const restaurant = state.restaurants[restaurantId] ? state.restaurants[restaurantId] : state.restaurants.restaurant
  debugger
  return ({
    restaurantId,
    restaurant: state.restaurants.restaurant,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchRestaurant: id => dispatch(fetchRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
