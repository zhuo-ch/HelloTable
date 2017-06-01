import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { searchRestaurants, setSearchParams } from '../../actions/search_actions';
import FontAwesome from 'react-fontawesome';
import SearchBox from './search_box';
import SeatBar from './seat_bar';
import TimeBar from './time_bar';
import * as SearchAPIUtil from '../../util/search_api_util';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nullSearch: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDefaultDate = this.getDefaultDate.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchTerm === '') {
      this.setState({nullSearch: true});
      return ;
    }

    const id = this.props.searchBoxParams.searchId;
    const type = this.props.searchBoxParams.searchType;

    if (!(this.props.restaurantId)) {
      this.props.router.push(`${type}/${id}`)
    }
  }

  handleDateChange(e) {
    e.preventDefault();
    const newDate = e.currentTarget.value.split('-');
    const date = newDate[1]+'-'+newDate[2]+'-'+newDate[0];
    this.props.setSearchParams({ date });
  }

  getDefaultDate() {
    const date = this.props.searchParams.date.split('-');
    return `${date[2]}-${date[0]}-${date[1]}`;
  }

  render() {
    const defaultDate = this.getDefaultDate();
    const head = this.props.header ? this.props.header : "";
    const searchBox = this.props.restaurantId ? '' : <SearchBox nullSearch={ this.state.nullSearch } />;

    return (
      <div className='search-bar'>
        <h1>{ head }</h1>
        <div className='search-fields'>
          <form className='seats-form' onSubmit={ this.handleSubmit }>
            <SeatBar />
            <input type='date'
              required='required'
              name='date'
              min = { defaultDate }
              defaultValue={ defaultDate }
              className='input bar-date'
              onChange={ this.handleDateChange }
              ></input>
            <TimeBar />
            { searchBox }
          <input type='submit' className='bar-submit' value='Search' ></input>
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    searchBoxParams: state.searchBoxParams,
    searchParams: state.search.searchParams,
    header: ownProps.header,
    restaurantId: ownProps.restaurantId
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    searchRestaurants: query => dispatch(searchRestaurants(query)),
    setSearchParams: query => dispatch(setSearchParams(query)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
