import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCity } from '../../actions/city_actions';
import RestaurantSnippet from '../restaurant/restaurant_snippet';
import SearchBar from '../search/search_bar'
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';

class CityShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({fetching: true});
    this.props.fetchCity(this.props.cityId)
      .then(() => this.setState({fetching: false}))
      .then(() => this.props.resetCurrentModal());
  }

  render() {
    let Snippets;

    if (this.state.fetching === true) {
      this.props.setCurrentModal({hidden: false, type: 'spinner'})
    } else {
      Snippets = this.props.city.restaurants.map((restaurant) => {
        return (<RestaurantSnippet restaurant={restaurant} key={restaurant.id}/>);
      });
    }

    return (
      <div className='restaurants-index'>
        <section className='restaurants-index-splash'>
          <SearchBar header=""/>
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
  fetchCity: cityId => dispatch(fetchCity(cityId)),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CityShow);
