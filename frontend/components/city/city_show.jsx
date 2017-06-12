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
    this.state = {activeFilter: 'Top Rated'};
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.getClassName = this.getClassName.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillMount() {
    this.props.setCurrentModal({hidden: false, type: 'spinner'});
    this.props.fetchCity(this.props.cityId)
      .then(() => this.props.resetCurrentModal());
  }

  handleFilter(e) {
    e.preventDefault();
    this.setState({activeFilter: e.currentTarget.innerText});
  }

  filterRestaurants() {
    switch (this.state.activeFilter) {
      case 'Top Rated':
        return this.props.city.restaurants.sort((a, b) => {
          return b.ratings.rating/b.ratings.total - a.ratings.rating/a.ratings.total;
        });
      case 'Best Value':
        return this.props.city.restaurants.sort((a,b) => {
          return b.ratings.value/b.ratings.total - a.ratings.value/a.ratings.total;
        });
      case 'Newest Restaurants':
        return this.props.city.restaurants.sort((a,b) => b.id - a.id);
      default:
        return this.props.city.restaurants;
    }
  }

  getClassName(name) {
    if (this.state.activeFilter === name) {
      return 'filter-item active-filter';
    } else {
      return 'filter-item';
    }
  }

  getFilter() {
    return (
      <div className='filter'>
        <ul className='filter-list'>
          <li className={this.getClassName('Top Rated')} onClick={this.handleFilter}>Top Rated</li>
          <li className={this.getClassName('Best Value')} onClick={this.handleFilter}>Best Value</li>
          <li className={this.getClassName('Newest Restaurants')} onClick={this.handleFilter}>Newest Restaurants</li>
        </ul>
      </div>
    );
  }

  render() {
    const filterBar = this.getFilter();
    const restaurants = this.filterRestaurants();
    const Snippets = restaurants.map((restaurant) => {
      return (<RestaurantSnippet restaurant={restaurant} key={restaurant.id}/>);
    });

    return (
      <div className='restaurants-index'>
        <section className='restaurants-index-splash'>
          <SearchBar header=""/>
        </section>
        <section className='restaurant-snippets'>
          { filterBar }
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
    favorites: state.session.currentUser.favorites,
  })
}

const mapDispatchToProps = dispatch => ({
  fetchCity: cityId => dispatch(fetchCity(cityId)),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CityShow);
