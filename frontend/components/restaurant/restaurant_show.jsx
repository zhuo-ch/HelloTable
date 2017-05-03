import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchRestaurant } from '../../actions/restaurant_actions';
import RestaurantMap from './restaurant_map';
import PhotoSection from './photo_section';
import FontAwesome from 'react-fontawesome';
import ReservationsSnippet from './reservations';
import Scrollchor from 'react-scrollchor';
import { StickyContainer, Sticky } from 'react-sticky';
import SearchBar from '../search/search_bar';
import { fetchAllReviews } from '../../actions/review_action';

class RestaurantShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll;
  }

  handleScroll(e) {
    console.log(e);
  }

  componentWillMount() {
    this.props.fetchRestaurant(this.props.restaurantId);
    this.props.fetchAllReviews(this.props.restaurantId);
  }

  getReservations() {
    if (this.props.restaurant.id === '') {
      return '';
    }

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return (
      <ReservationsSnippet
        restaurantId={this.props.restaurant.id} />
    )
  }

  render() {
    const resSnippet = this.getReservations();

    return (
      <StickyContainer className='restaurant-view'>
        <section className='restaurant-splash'>
          <div className='restaurant-splash-img grey-left'>
            <section className='splash-img-holder'>
              <img src={this.props.restaurant.images[0]}/>
            </section>
          </div>
          <div className='splash-details grey-right'>
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
            <Sticky>
              <article className='bold'>
                <Scrollchor to='#reservations'><h3>Reservation</h3></Scrollchor>
              </article>
              <article>
                <Scrollchor to='#about'><h3>About</h3></Scrollchor>
              </article>
              <article>
                <Scrollchor to='#photos'><h3>Photos</h3></Scrollchor>
              </article>
            </Sticky>
          </section>

          <section className='restaurant-mid'>
            <article className='reservations-container' id='reservations'>
              <SearchBar restaurantId={this.props.restaurant.id}/>
              { resSnippet }
            </article>
            <article className='restaurant-about' id="about">
              <div className='about-text'>
                <div className='about-header'>
                  <h2>About {this.props.restaurant.restaurant_name}</h2>
                </div>
                <div className='about-description'>
                  {this.props.restaurant.description}
                </div>
              </div>
            </article>

            <article className='show-photos' id="photos">
              <PhotoSection photos={this.props.restaurant.images} />
            </article>
          </section>

          <section className='restaurant-right'>
            <article>
              <h4><FontAwesome name='cuisine-bell' className="fa fa-bell-o icon" />Cuisine:</h4>
              {this.props.restaurant.cuisine}
            </article>
            <article>
              <h4><FontAwesome name='hours-clock' className="fa fa-clock-o icon" />Hours of Operation:</h4>
              <ul>
                {
                  this.props.restaurant.hours.split(',').map((day, idx) => {
                      return <li key={idx}>{day}</li>
                  })
                }
              </ul>
            </article>
            <article>
              <h4><FontAwesome name='phone-mobile' className="fa fa-mobile icon" />Phone Number:</h4>
              {
                '(' + this.props.restaurant.restaurant_number.slice(0, 3)
                + ') ' + this.props.restaurant.restaurant_number.slice(3, 6)
                + ' - ' + this.props.restaurant.restaurant_number.slice(6, 10)
              }
            </article>
            <article>
              <h4><FontAwesome name='address-car' className="fa fa-car icon" />Address:</h4>
              { this.props.restaurant.street_address }
              {
                this.props.restaurant.city_name + ', '
                + this.props.restaurant.state + ' '
                + this.props.restaurant.zip
              }
            </article>
            <article>
              <h4><FontAwesome name='web-wifi' className="fa fa-wifi icon" />Website:</h4>
              {this.props.restaurant.site}
            </article>
          </section>
        </div>
      </StickyContainer>
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
  fetchAllReviews: id => dispatch(fetchAllReviews(id)),
  fetchRestaurant: id => dispatch(fetchRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
