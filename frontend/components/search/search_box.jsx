import { connect } from 'react-redux';
import { withRouter, hashHistory } from 'react-router';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { setSearchBoxParams, searchRestaurants, filterResults } from '../../actions/search_actions';
import * as MapUtil from '../../util/map_util';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showList: false, targetIdx: -1 };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getSearchBox = this.getSearchBox.bind(this);
    this.setDelay = this.setDelay.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentWillUnmount() {
    this.props.setSearchBoxParams({ searching: false, searchTerm: '', searchId: '', searchType: '' });
  }

  handleEnter() {
    let type = 'restaurants';
    let idx = this.state.targetIdx - this.props.cities.length;

    if (this.state.targetIdx < this.props.cities.length) {
      type = 'cities';
      idx = this.state.targetIdx;
    }

    this.handleRedirect(type, idx);
  }

  handleRedirect(type, idx) {
    const typeHeader = type === 'restaurants' ? 'restaurant' : type;
    const id = this.props[type][idx].id;

    hashHistory.push(`${typeHeader}/${id}`);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ showList: false });
    this.props.setSearchBoxParams({
      searching: false,
      searchTerm: e.currentTarget.innerText,
      searchId: e.currentTarget.id,
      searchType: e.currentTarget.type
    });
  }

  handleOutsideClick(e) {
    if (e) e.preventDefault();
    this.setState({ showList: false });
    document.removeEventListener('keydown', this.handleKey);
  }

  handleChange(e) {
    const searchTerm = e.currentTarget.value;
    if (searchTerm !== '') {
      this.setState({ showList: true });
      document.removeEventListener('keydown', this.handleKey);
      document.addEventListener('keydown', this.handleKey);
      this.handleKey(e);
    } else {
    this.handleOutsideClick();
    this.props.setSearchBoxParams({ searching: false, searchTerm });
    }
  }

  handleSearchTermChange(e) {
    const searchTerm = e.currentTarget.value;
    if (this.props.searchBoxParams.searchTerm.indexOf(searchTerm) !== -1) {
      this.props.setSearchBoxParams({ searchTerm });
      this.props.filterResults(searchTerm);
    } else {
      this.props.setSearchBoxParams({ searchTerm });
      this.setDelay();
    }
  }

  handleKey(e) {
    if (this.state.showList) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          this.setState({ selecting: false });
          this.handleOutsideClick();
          this.handleEnter();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (this.state.targetIdx > 0) {
            this.setState({ targetIdx: this.state.targetIdx - 1 });
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (this.state.targetIdx < this.props.cities.length + 9) {
            this.setState({ targetIdx: this.state.targetIdx + 1 });
          }
          break;
        default:
          this.handleSearchTermChange(e);
          break;
      }
    } else {
      this.handleSearchTermChange(e);
    }
  }

  getSearchResults() {
    if (this.props.searchBoxParams.searchTerm !== '') {
      this.props.setSearchBoxParams({ searching: true });
      this.props.searchRestaurants(this.props.searchBoxParams.searchTerm);
    }
  }

  setDelay(searchTerm) {
    clearTimeout(this.props.searchBoxParams.timer)
    let timer = setTimeout(this.getSearchResults, 300);
    this.props.setSearchBoxParams({ timer });
  }

  getCities() {
    return this.props.cities.map((city, idx) => {
      return (
        <li key={city.id * 1000}
          onClick={ this.handleClick }
          id={ city.id }
          className={ this.state.showList && this.state.targetIdx === idx ? 'highlight' : '' }
          type='cities'>
          { city.name } { city.state }
        </li>
      );
    });
  }

  getRestaurants() {
    return this.props.restaurants.slice(0, 10).map((res, idx) => {
      const address = MapUtil.parseAddress(res.address).city.split(', ');
      const city = address[0];
      const state = address[1].split(' ')[0];
      const targeted = this.state.showList && (this.state.targetIdx === idx + this.props.cities.length);

      return (
        <li
          key={ res.id }
          onClick={ this.handleClick }
          id={ res.id }
          className={ targeted ? 'highlight' : '' }
          type='restaurant'>
          { res.name }, { city } { state }
        </li>
      );
    });
  }

  getResults() {
    const toggle = (this.props.searchBoxParams.searching ? 'search-list' : 'no-search');
    const cities = this.getCities();
    const restaurants = this.getRestaurants();

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
    const resultList = this.state.showList ? this.getResults() : '';
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
    const wrapper = this.state.showList ? '' : 'hidden';

    return (
      <section className='search-field'>
        <div className='input-wrapper' id={ wrapper } onClick={ this.handleOutsideClick }></div>
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
  filterResults: searchTerm => dispatch(filterResults(searchTerm)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));
