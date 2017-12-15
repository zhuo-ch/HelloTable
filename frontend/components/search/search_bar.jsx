import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { searchRestaurants, setSearchParams } from '../../actions/search_actions';
import FontAwesome from 'react-fontawesome';
import SearchBox from './search_box';
import SeatBar from './seat_bar';
import TimeBar from './time_bar';
import DateBar from './date_bar';
import * as SearchAPIUtil from '../../util/search_api_util';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nullSearch: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.searchBoxParams.searchId === null) {
      this.setState({nullSearch: true});
    } else {
      const id = this.props.searchBoxParams.searchId;
      const type = this.props.searchBoxParams.searchType;
      this.props.router.push(`${type}/${id}`);
    }
  }

  handleDateChange(e) {
    e.preventDefault();
    const newDate = e.currentTarget.value.split('-');
    const date = newDate[1]+'-'+newDate[2]+'-'+newDate[0];
    this.props.setSearchParams({ date });
  }
  //
  // getDefaultDate() {
  //   const date = this.props.searchParams.date.split('-');
  //   return `${date[2]}-${date[0]}-${date[1]}`;
  // }
  //
  // getCurrentDate() {
  //   const currDate = new Date();
  //   return currDate;
  // }
  //
  // getDateBox() {
  //   return (
  //     <input type='date'
  //       required='required'
  //       name='date'
  //       min = { new Date() }
  //       defaultValue={ this.getDefaultDate() }
  //       className='input bar-date'
  //       onChange={ this.handleDateChange }
  //       ></input>
  //   );
  // }

  getDateBox() {
    return (<DateBar
      minValue={ new Date() }
      defaultDate={ this.props.searchParams.date }
      handleChange={ this.handleDateChange }
      />);
  }

  render() {
    const dateBox = this.getDateBox();
    const head = this.props.header ? this.props.header : "";
    const searchBox = this.props.restaurantId ? '' : <SearchBox nullSearch={ this.state.nullSearch } />;
    const searchButton = this.props.restaurantId ? '' : <input type='submit' className='bar-submit' value='Search' onClick={ this.handleSubmit }></input>;

    return (
      <div className='search-bar'>
        <h1>{ head }</h1>
        <div className='search-fields'>
          <form className='seats-form' onSubmit={ this.handleSubmit }>
            <SeatBar />
            { dateBox }
            <TimeBar />
            { searchBox }
            { searchButton }
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    searchBoxParams: state.search.searchBoxParams,
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
