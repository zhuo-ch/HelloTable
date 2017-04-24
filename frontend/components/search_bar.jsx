import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { searchRestaurants } from '../actions/restaurant_actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.searchTerm = "";
  }
  render() {
    debugger
    return (
      <div className='search-form'>
        <form>
          <input type='text' value='query'>{this.searchTerm}</input>
          <input type='submit'>Search</input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({restaurants}) => ({
  restaurants
})

const mapDispatchToProps = () => {
  return ({
    searchRestaurants: query => dispatch(searchRestaurants(query)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
