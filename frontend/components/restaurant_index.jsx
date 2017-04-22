import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllRestaurants } from '../actions/restaurant_actions';

class RestaurantIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchAllRestaurants(this.props.cityId);
  }

  render() {
    return (
      <div>
        {
          Object.keys(this.props.restaurants).map((id) => <h3>{this.props.restaurants[id].restaurant_name}</h3>)
        }
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
