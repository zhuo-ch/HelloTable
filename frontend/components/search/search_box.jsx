import { connect } from 'react-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { setSearchBoxParams, searchRestaurants, filterResults } from '../../actions/search_actions';
import * as MapUtil from '../../util/map_util';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showList: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getSearchBox = this.getSearchBox.bind(this);
    this.setDelay = this.setDelay.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ showList: true });
    this.props.setSearchBoxParams({
      searching: false,
      searchTerm: e.currentTarget.innerText,
      searchId: e.currentTarget.id,
      searchType: e.currentTarget.type
    });
  }

  handleOutsideClick(e) {
    e.preventDefault();
    this.setState({ showList: false });
    document.removeEventListener('keydown', this.handleKey);
  }

  handleChange(e) {
    e.preventDefault();
    const searchTerm = e.currentTarget.value;
    this.setState({ showList: true });
    if (searchTerm !== '') {
      if (this.props.searchBoxParams.searchTerm.indexOf(searchTerm) !== -1) {
        this.props.setSearchBoxParams({ searchTerm });
        this.props.filterResults(searchTerm);
      } else {
        this.props.setSearchBoxParams({ searchTerm });
        this.setDelay();
      }
    } else {
      this.props.setSearchBoxParams({ searching: false, searchTerm });
    }
  }

  handleKey(e) {
    e.preventDefault();

    if (this.state.showList) {
      switch (e.key) {
        case 'Enter':
          this.props.setSearchParams({ time: this.getSlots()[this.state.targeted] });
          this.setState({ selecting: false })
          document.removeEventListener('keydown', this.handleKey);
          break;
        case 'ArrowUp':
          if (this.state.targeted > 0) {
            this.setState({ targeted: this.state.targeted - 1 });
          }
          break;
        case 'ArrowDown':
          if (this.state.targeted < this.getSlots().length - 1) {
            this.setState({ targeted: this.state.targeted + 1 });
          }
          break;
        default:
          break;
      }
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

  getResults() {
    const toggle = (this.props.searchBoxParams.searching ? 'search-list' : 'no-search');

    const cities = this.props.cities.map((city) => {
      return (<li key={city.id * 1000}
        onClick={ this.handleClick }
        id={ city.id }
        type='cities'>
        { city.name } { city.state }
      </li>);
    });

    const restaurants = this.props.restaurants.map((res) => {
      const address = MapUtil.parseAddress(res.address).city.split(', ');
      const city = address[0];
      const state = address[1].split(' ')[0];

      return (<li key={ res.id }
        onClick={ this.handleClick }
        id={ res.id }
        type='restaurant'>
        { res.name }, { city } { state }
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
