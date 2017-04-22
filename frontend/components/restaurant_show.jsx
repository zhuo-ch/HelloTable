import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchRestaurant } from '../actions/restaurant_actions';
import RestaurantMap from './restaurant_map';

class RestaurantShow extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {map: <div></div>};
  }

  componentWillMount() {
    this.props.fetchRestaurant(this.props.restaurantId);
  }

  componentWillUpdate(prevProps, nextState) {
    // debugger
    // if (nextState.map != this.state.map) {
    //   this.setState({
    //     map: (
            // <RestaurantMap
            //   restaurants={this.props.restaurant}
            //   restaurantId={this.props.restaurant.id}
            //   singleRestaurant="true"
            //   fetchRestaurant={fetchRestaurant} />
    //     )})
    // }
    // debugger
  }
  // <RestaurantMap
  //   restaurants={this.props.restaurant}
  //   restaurantId={this.props.restaurant.id}
  //   singleRestaurant="true"
  //   fetchRestaurant={fetchRestaurant} />

  render() {
    return (
      <div className='restaurant-view'>
        <section className='restaurant-splash group'>
          <div className='restaurant-splash-img'>
            <div className='res-img'>
            <h4>Image</h4>
            </div>
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

        <div className='restaurant-body'>
          <section className='restaurant-left'>
            <article className='bold'>
              <h3>Reservation</h3>
            </article>
            <article>
              <h3>About</h3>
            </article>
            <article>
              <h3>Photos</h3>
            </article>
            <article>
              <h3>Reviews</h3>
            </article>
          </section>

          <section className='restaurant-mid'>
            <article className='restaurant-about'>
              <h3>About {this.props.restaurant.restaurant_name}</h3>
              {this.props.restaurant.description}
            </article>
            <article className='restaurant-map'>
            </article>
          </section>

          <section className='restaurant-right'>
            <article>
              <h4>Cuisine:</h4>
              {this.props.restaurant.cuisine}
            </article>
            <article>
              <h4>Hours of Operation:</h4>
              {this.props.restaurant.hours}
            </article>
            <article>
              <h4>Phone Number:</h4>
              {this.props.restaurant.restaurant_number}
            </article>
            <article>
              <h4>Address:</h4>
              {this.props.restaurant.location}
            </article>
            <article>
              <h4>Website:</h4>
              {this.props.restaurant.site}
            </article>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, {params}) => {
  const restaurantId = parseInt(params.restaurantId);
  // const restaurant = state.restaurants[restaurantId] ? state.restaurants[restaurantId] : state.restaurants.restaurant

  return ({
    restaurantId,
    restaurant: state.restaurants.restaurant,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchRestaurant: id => dispatch(fetchRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
