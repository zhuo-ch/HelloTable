import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllRestaurants } from '../actions/restaurant_actions';
import RestaurantSnippet from './restaurant_snippet';

class RestaurantIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchAllRestaurants(this.props.cityId);
  }

  render() {
    const Snippets = Object.keys(this.props.restaurants).map((id) => {
      return (<RestaurantSnippet key={id} restaurant={this.props.restaurants[id]} />);
    })

    return (
      <div className='restaurants-index'>
        <section className='restaurants-index-splash'>
          <image src='https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?h=350&auto=compress&cs=tinysrgb'></image>
        </section>
        <section className='restaurant-snippets'>
          { Snippets }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    cityId: ownProps.params.cityId,
    restaurants: state.restaurants,
  })
}

const mapDispatchToProps = dispatch => ({
  fetchAllRestaurants: (city) => dispatch(fetchAllRestaurants(city)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantIndex);
