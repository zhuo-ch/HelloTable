import { connect } from 'react-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { setSearchBoxParams, searchRestaurants } from '../../actions/search_actions';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getSearchBox = this.getSearchBox.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.setSearchBoxParams({searching: false,
      searchTerm: e.currentTarget.innerText,
      searchId: e.currentTarget.id,
      searchType: e.currentTarget.type});
  }

  handleChange(e) {
    e.preventDefault();
    const searchTerm = e.currentTarget.value;

    if (searchTerm !== '') {
      this.props.setSearchBoxParams({ searching: true, searchTerm });
      this.props.searchRestaurants(searchTerm);
    } else {
      this.props.setSearchBoxParams({ searching: false, searchTerm });
    }
  }

  getResults() {
    const toggle = (this.props.searchBoxParams.searching ? 'search-list' : 'no-search');

    const cities = this.props.cities.map((city) => {
      return (<li key={city.id * 1000}
        onClick={ this.handleClick }
        id={ city.id }
        type='cities'>
        { city.city_name } { city.state }
      </li>);
    });

    const restaurants = this.props.restaurants.map((res) => {
      return (<li key={ res.id }
        onClick={ this.handleClick }
        id={ res.id }
        type='restaurant'>
        { res.restaurant_name } { res.city_name } { res.state }
      </li>);
    });

    return (
      <ul className={ toggle }>
        <li className='search-res-cities'><FontAwesome name='search-city' className='fa fa-map-marker icon'/>Cities</li>
        { cities }
        <li className='search-res-res'><FontAwesome name='search-res' className='fa fa-cutlery icon'/>Restaurants</li>
        { restaurants }
      </ul>
    );
  }

  getSearchBox() {
    const resultList = this.getResults();
    let cName;
    let pHolder;

    if (this.props.nullSearch) {
      cName = 'input red';
      pHolder = 'Type here to search';
    } else {
      cName = 'input';
      pHolder = 'Search Restaurants';
    }

    return (
        <article className='search-box-container'>
          <input
            type='search'
            name='query'
            placeholder={ pHolder }
            className={ cName }
            autoComplete='off'
            onChange={ this.handleChange }
            value={ this.props.searchBoxParams.searchTerm }>
          </input>
          { resultList }
        </article>
    )
  }

  render() {
    const searchBox = this.getSearchBox();

    return (
      <section className='search-field'>
        { searchBox }
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  nullSearch: ownProps.nullSearch,
  cities: state.search.cities,
  restaurants: state.search.restaurants,
  searchBoxParams: state.search.searchBoxParams,
});

const mapDispatchToProps = dispatch => ({
  setSearchBoxParams: params => dispatch(setSearchBoxParams(params)),
  searchRestaurants: params => dispatch(searchRestaurants(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
