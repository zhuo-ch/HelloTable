import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { searchRestaurants } from '../../actions/restaurant_actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searching: false,
      searchTerm: "",

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({searching: false, searchTerm: e.currentTarget.innerText})
  }

  handleChange(e) {
    e.preventDefault();
    const val = e.currentTarget.value;

    if (val !== "") {
      this.setState({searching: true});
    } else {
      this.setState({searching: false});
    }

    this.props.searchRestaurants(val);
    this.setState({searchTerm: val});
  }

  render() {
    const toggle = (this.state.searching ? 'search-list' : 'no-search');
    const results = (
           Object.keys(this.props.restaurants).map((id) => {
             const restaurant = this.props.restaurants[id]

             return (<li key={id}
               onClick={this.handleClick}
               id={id}>{restaurant.restaurant_name} {restaurant.city_name} {restaurant.state}</li>);
           }));
    let seats = [];

    for (let i = 1; i < 11; i++) {
     seats.push(<option key={i} value={i}>{i} Seats</option>)
    }

    return (
      <div className='search-bar'>
        <h1>Say goodbye to headache and say hello table!</h1>
        <div className='search-fields'>
          <section className='num-seats'>
            <form className='seats-form'>
              <select name='seats'>
                { seats }
              </select>
            </form>
          </section>
          <section className='date'>
            <input type='date'></input>
          </section>
          <section className='time'>

          </section>
          <section className='search-field'>
            <input
              type='search'
              name='query'
              placeholder='Search For a Table'
              onChange={this.handleChange}
              value={this.state.searchTerm}></input>
            <ul className={ toggle }>
              { results }
            </ul>
          </section>
          <section className='search-button'>
            <button>Search</button>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({restaurants}) => ({
  restaurants
})

const mapDispatchToProps = dispatch => {
  return ({
    searchRestaurants: query => dispatch(searchRestaurants(query)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
