import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchRestaurant, resetRestaurant } from '../../actions/restaurant_actions';
import RestaurantMap from './restaurant_map';
import PhotoSection from './photo_section';
import FontAwesome from 'react-fontawesome';
import ReservationsSnippet from './reservations';
import Scrollchor from 'react-scrollchor';
import { StickyContainer, Sticky } from 'react-sticky';
import SearchBar from '../search/search_bar';
import { receiveAllReviews } from '../../actions/review_actions';
import { addFavorite, removeFavorite } from '../../actions/favorites_actions';
import ReviewSnippet from '../review/review_snippet';
import ReactStars from 'react-stars';
import FavoriteBox from '../favorite/favorite_box';

class RestaurantShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchRestaurant(this.props.restaurantId)
      .then(e => this.props.receiveAllReviews(e.restaurant));
  }

  componentWillReceiveProps(nextProps) {
    const nextId = nextProps.location.pathname;
    const curId = this.props.location.pathname;

    if (nextId !== curId) {
      this.props.fetchRestaurant(nextId.slice(11, nextId.length))
      .then(e => this.props.receiveAllReviews(e.restaurant));
    }
  }

  componentWillUnmount() {
    this.props.resetRestaurant();
  }

  getReservations() {
    if (this.props.restaurant.id === '') {
      return '';
    }

    return (
      <ReservationsSnippet
        restaurantId={this.props.restaurant.id} />
    )
  }

  getStarRating(rating) {
    return (
      <ReactStars
        count={ 5 }
        edit={ false }
        value={ rating }
        />
    );
  }

  getAvgRatings() {
    function average(item) {
      return Math.floor(item/this.props.ratings.total*2)/2;
    }

    const ratings = {};
    Object.keys(this.props.ratings).forEach(key => {
      if (key != 'total') {
        ratings[key] = this.props.ratings[key] ? Math.floor(this.props.ratings[key]/this.props.ratings.total*2)/2 : 0;
      }
    })

    return ratings
  }

  getReviewTopBar(averages) {
    const starRating = this.getStarRating(averages.rating);

    return (
      <div className='review-top'>
        <section className='review-overalls'>
          <article className='rating'>{averages.rating}</article>
          <article className='rating-stars'>
            <span className='overall'>Overall Rating</span>
            <div className='overall-stars'>{ starRating }
              based on
              { this.props.ratings.total }
              ratings
            </div>
          </article>
        </section>
        <section className='review-averages'>
            {
              Object.keys(averages).map(key => {
                return (
                  <ul key={key} className='avg-scores'>
                    <li key='type' className='review-type'>
                      {key.toUpperCase()}
                    </li>
                    <li key='score' className='review-score'>
                      {averages[key]}
                    </li>
                  </ul>
                );
              })
            }
        </section>
      </div>
    )
  }

  getMap() {
    return this.props.restaurant.id ? <RestaurantMap /> : '';
  }

  render() {
    const resSnippet = this.getReservations();
    const averages = this.getAvgRatings();
    const reviewTopBar = this.getReviewTopBar(averages);
    const reviewSnippets = this.props.reviews.map(review => <ReviewSnippet key={review.id} review={ review } />);
    const map = this.getMap();

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
              { this.getStarRating(averages.rating) }
            </section>
            <section className='splash-info'>
              <section className='info-details'>
                <h5 className='splash-cuisine'>{this.props.restaurant.cuisine}</h5>
                <h5 className='splash-location'>{this.props.restaurant.city_name}, {this.props.restaurant.state}</h5>
              </section>
              <section className="fav-section">
                <FavoriteBox restaurantId={ this.props.restaurantId } />
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
              <article>
                <Scrollchor to='#reviews'><h3>Reviews</h3></Scrollchor>
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
                { map }
              </div>
            </article>

            <article className='show-photos' id="photos">
              <PhotoSection photos={this.props.restaurant.images} />
            </article>

            <article className='reviews-section' id='reviews'>
              <section className='reviews-section-bar'>
                <h1>{this.props.restaurant.restaurant_name} Ratings and Reviews</h1>
                { reviewTopBar }
              </section>
                { reviewSnippets }
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
              <br></br>
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
    reviews: state.reviews.reviews,
    ratings: state.reviews.ratings,
    favorites: state.favorites,
  });
};

const mapDispatchToProps = dispatch => ({
  receiveAllReviews: id => dispatch(receiveAllReviews(id)),
  fetchRestaurant: id => dispatch(fetchRestaurant(id)),
  resetRestaurant: () => dispatch(resetRestaurant()),
  addFavorite: favorite => dispatch(addFavorite(favorite)),
  removeFavorite: id => dispatch(removeFavorite()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
