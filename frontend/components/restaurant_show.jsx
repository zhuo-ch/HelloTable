import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchRestaurant } from '../actions/restaurant_actions';
import RestaurantMap from './restaurant_map';
import PhotoSection from './photo_section';

class RestaurantShow extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {map: <div></div>};
  }

  componentWillMount() {
    this.props.fetchRestaurant(this.props.restaurantId);
  }

  // componentWillUpdate(prevProps, nextState) {
  //   // debugger
  //   // if (nextState.map != this.state.map) {
  //   //   this.setState({
  //   //     map: (
  //           // <RestaurantMap
  //           //   restaurants={this.props.restaurant}
  //           //   restaurantId={this.props.restaurant.id}
  //           //   singleRestaurant="true"
  //           //   fetchRestaurant={fetchRestaurant} />
  //   //     )})
  //   // }
  //   // debugger
  // }
  // <RestaurantMap
  //   restaurants={this.props.restaurant}
  //   restaurantId={this.props.restaurant.id}
  //   singleRestaurant="true"
  //   fetchRestaurant={fetchRestaurant} />

  render() {
    return (
      <div className='restaurant-view'>
        <section className='restaurant-splash'>
          <div className='restaurant-splash-img'>
            <img src={this.props.restaurant.images[0]}/>
          </div>

          <div className='splash-details'>
            <section className="splash-name"><h1>{this.props.restaurant.restaurant_name}</h1></section>
            <section className="splash-ratings">
              {}
            </section>
            <section className='splash-info'>
              <section className='info-details'>
                <h5 className='splash-cuisine'>{this.props.restaurant.cuisine}</h5>
                <h5 className='splash-location'>{this.props.restaurant.city_name}, {this.props.restaurant.state}</h5>
              </section>
              <section className="likes">

              </section>
            </section>
          </div>
        </section>

        <div className='restaurant-body'>
          <section className='restaurant-left'>
            <article className='bold'>
              <h3>Reservation</h3>
            </article>
            <article>
              <h3><a href="#about">About</a></h3>
            </article>
            <article>
              <h3><a href="#photos">Photos</a></h3>
            </article>
            <article>
              <h3>Reviews</h3>
            </article>
          </section>

          <section className='restaurant-mid'>
            <article className='restaurant-about' id="about">
              <div className='about-text'>
                <div className='about-header'>
                  <h2>About {this.props.restaurant.restaurant_name}</h2>
                </div>
                <div className='about-description'>
                  {this.props.restaurant.description}
                </div>
              </div>
              <div className='restaurant-map'>
              </div>
            </article>

            <article className='show-photos'>
              <PhotoSection photos={this.props.restaurant.images} />
            </article>
          </section>

          <section className='restaurant-right'>
            <article>
              <h4>Cuisine:</h4>
              {this.props.restaurant.cuisine}
            </article>
            <article>
              <h4>Hours of Operation:</h4>
              <ul>
                {
                  this.props.restaurant.hours.split(',').map((day, idx) => {
                      return <li key={idx}>{day}</li>
                  })
                }
              </ul>
            </article>
            <article>
              <h4>Phone Number:</h4>
              {
                '(' + this.props.restaurant.restaurant_number.slice(0, 3)
                + ') ' + this.props.restaurant.restaurant_number.slice(3, 6)
                + ' - ' + this.props.restaurant.restaurant_number.slice(6, 10)
              }
            </article>
            <article>
              <h4>Address:</h4>
              { this.props.restaurant.street_address }
              {
                this.props.restaurant.city_name + ', '
                + this.props.restaurant.state + ' '
                + this.props.restaurant.zip
              }
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
  let restaurantId = parseInt(params.restaurantId);

  return ({
    restaurantId,
    restaurant: state.restaurants.restaurant,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchRestaurant: id => dispatch(fetchRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
