import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { searchRestaurants, setSearchParams } from '../../actions/search_actions';
import FontAwesome from 'react-fontawesome';
import SearchBox from './search_box';
import SeatBar from './seat_bar';
import TimeBar from './time_bar';
import DateBar from './date_bar';

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

const mapStateToProps = (state, ownProps) => ({
    searchBoxParams: state.search.searchBoxParams,
    searchParams: state.search.searchParams,
    header: ownProps.header,
    restaurantId: ownProps.restaurantId
  });

const mapDispatchToProps = dispatch => ({
    searchRestaurants: query => dispatch(searchRestaurants(query)),
    setSearchParams: query => dispatch(setSearchParams(query)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
