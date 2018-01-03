import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { fetchCity } from '../../actions/city_actions';
import RestaurantSnippet from '../restaurant/restaurant_snippet';
import SearchBar from '../search/search_bar'
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';

class CityShow extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { activeFilter: 'Top Rated' };
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.getClassName = this.getClassName.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  componentWillMount() {
    this.props.setCurrentModal({hidden: false, type: 'spinner'});
    this.props.fetchCity({ id: this.props.cityId, per_page: 5, filter: 'Top Rated' })
      .then(() => this.props.resetCurrentModal());
  }

  handleFilter(e) {
    e.preventDefault();
    this.setState({activeFilter: e.currentTarget.innerText});
  }

  handlePage(e) {
    e.preventDefault();
    const currentPage = this.props.pagination.page;
    const totalPages = this.props.pagination.pages;
    let newPage;

    switch (e.currentTarget.id) {
      case 'double-left':
        newPage = currentPage - 5;
        break;
      case 'left':
        newPage = currentPage - 1;
        break;
      case 'right':
        newPage = currentPage + 1;
        break;
      case 'double-right':
        newPage = currentPage + 5;
        break;
      default:
        newPage = e.currentTarget.id;
    }

    if (newPage > 0 && newPage <= totalPages) {
      this.handleNewPage(newPage);
    }
  }

  handleNewPage(page) {
    const params = {
      id: this.props.cityId,
      pages: this.props.pagination.pages,
      per_page: this.props.pagination.per_page,
      page,
    };
    debugger
    this.props.fetchCity(params);
  }

  filterRestaurants() {
    switch (this.state.activeFilter) {
      case 'Top Rated':
        return this.props.restaurants.sort((a, b) => {
          return b.ratings.rating/b.ratings.total - a.ratings.rating/a.ratings.total;
        });
      case 'Best Value':
        return this.props.restaurants.sort((a,b) => {
          return b.ratings.value/b.ratings.total - a.ratings.value/a.ratings.total;
        });
      case 'Newest Restaurants':
        return this.props.restaurants.sort((a,b) => b.id - a.id);
      default:
        return this.props.restaurants;
    }
  }

  getClassName(name) {
    if (this.props.pagination.filter === name) {
      return 'filter-item active-filter';
    } else {
      return 'filter-item';
    }
  }

  getFilters() {
    return (
      <ul className='filter-list'>
        <li className={this.getClassName('Top Rated')} onClick={this.handleFilter}>Top Rated</li>
        <li className={this.getClassName('Best Value')} onClick={this.handleFilter}>Best Value</li>
        <li className={this.getClassName('Newest Restaurants')} onClick={this.handleFilter}>Newest Restaurants</li>
      </ul>
    )
  }

  getPagesList() {
    const pages = new Array(this.props.pagination.pages).fill(0).map((el, idx) => idx + 1);
    const currentPage = this.props.pagination.page;
    const five = currentPage >= 3
      ? pages.slice(currentPage - 3, currentPage + 2)
      : pages.slice(0, 5);

    return five.map(el => {
      return (
        <li
          key={ el }
          id={ el }
          className={ el === currentPage ? 'highlight' : 'filter-item'}
          onClick={ this.handlePage }>
          { el }
        </li>
      );
    });
  }

  getArrow(type) {
    return (
      <li key={ type } id={ type } onClick={ this.handlePage }>
        <FontAwesome name={`angle-${type}`} className={`fa fa-${type} icon clickable`} />
      </li>
    );
  }

  getPages() {
    const pagesList = this.getPagesList();

    return (
      <ul className='page-list'>
        { this.getArrow('double-left') }
        { this.getArrow('left') }
        { pagesList }
        { this.getArrow('right') }
        { this.getArrow('double-right')}
      </ul>
    )
  }

  getFilterBar() {
    return (
      <div className='filter'>
        { this.getFilters() }
        { this.getPages() }
      </div>
    );
  }

  getSnippets(restaurants) {
    return restaurants.map((restaurant) => {
      return (<RestaurantSnippet restaurant={restaurant} key={restaurant.id}/>);
    });
  }

  render() {
    const filterBar = this.getFilterBar();
    const restaurants = this.filterRestaurants();
    const snippets = this.getSnippets(restaurants);

    return (
      <div className='restaurants-index'>
        <section className='restaurants-index-splash'>
          <SearchBar header=""/>
        </section>
        <section className='restaurant-snippets'>
          { filterBar }
          { snippets }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    cityId: ownProps.params.cityId,
    restaurants: state.restaurants.restaurants,
    pagination: state.restaurants,
});

const mapDispatchToProps = dispatch => ({
  fetchCity: cityId => dispatch(fetchCity(cityId)),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityShow);
