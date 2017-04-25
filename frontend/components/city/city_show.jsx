import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCity } from '../../actions/city_actions';
import RestaurantSnippet from './restaurant_snippet';

class CityShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchCity(this.props.cityId);
  }

  render() {
    const Snippets = this.props.restaurants.map((restaurant) => {
      return (<RestaurantSnippet restaurant={restaurant} key={restaurant.id}/>);
    })

    return (
      <div className='restaurants-index'>
        <section className='restaurants-index-splash'>
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
    city: state.cities.city,
    restaurants: state.cities.city.restaurants,
  })
}

const mapDispatchToProps = dispatch => ({
  fetchCity: (cityId) => dispatch(fetchCity(cityId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CityShow);
