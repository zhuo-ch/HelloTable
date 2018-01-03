import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { merge, omit } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { fetchCity } from '../../actions/city_actions';
import RestaurantSnippet from '../restaurant/restaurant_snippet';
import SearchBar from '../search/search_bar'
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';

class CityShow extends React.Component {
  constructor(props) {
    super(props);
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
    let params = merge({}, this.props.pagination, { filter: e.currentTarget.innerText, page: 1 });
    params = this.removeProps(params);
    this.props.fetchCity(params);
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
    let params = merge({}, this.props.pagination, { page });
    params = this.removeProps(params);
    this.props.fetchCity(params);
  }

  removeProps(obj) {
    return omit(obj, ['restaurant', 'restaurants', 'errors']);
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
    const snippets = this.getSnippets(this.props.restaurants);

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
