import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { searchRestaurants, findRestaurants } from '../../actions/search_actions';
import FontAwesome from 'react-fontawesome';


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searching: false,
      searchTerm: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.timeBar = this.timeBar.bind(this);
    this.seats = this.seats.bind(this);
    this.results = this.results.bind(this);
  }

  componentWillMount() {
    this.setState({searching: false, searchTerm: ""})
  }

  timeBar() {
    const currentTime = new Date();
    let startTime = (currentTime.getHours() > 12) ? currentTime.getHours() : 12;
    let endTime = 24;
    let minutes;
    let slots = new Array();

    if (currentTime.getMinutes() < 30) {
      minutes = 30;
    } else {
      startTime += 1;
      minutes = 0;
    }

    function formatMinutes(minute) {
      if (minute === 0) {
        return '0' + minute.toString();
      } else {
        return minute.toString();
      }
    }

    function formatHour(hour) {
      if (hour > 12) {
        return (Math.floor(hour%12)).toString();
      } else {
        return hour.toString();
      }
    }

    while (startTime < endTime) {
      slots.push(formatHour(startTime)+":"+formatMinutes(minutes)+"  PM")
      minutes += 30;

      if (minutes === 60) {
        minutes = 0;
        startTime += 1;
      }
    }

    slots = slots.map((slot, i) => {
      return <option value={slot} key={i}>{`${slot}`}</option>;
    });

    return (
      <select name='time' className='bar-time input'>
        {slots}
      </select>
    )
  }

  formatDate() {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    return (
      currentDate.split("-").map((num) => {
        if (parseInt(num) < 10) {
          return "0"+num;
        } else {
          return num;
        }
      }).join('-')
    );
  }

  seats() {
    let seats = [];

    for (let i = 1; i < 11; i++) {
      if (i === 1) {
        seats.push(<option key={i} value={i}>{i} Patron</option>)
      } else if (i === 2) {
        seats.push(<option key={i} value={i} selected>{i} Patrons</option>)
      } else {
        seats.push(<option key={i} value={i}>{i} Patrons</option>)
      }
    }

    return seats;
  }

  results() {
    if (this.props.restaurants.restaurant) {
      return "";
    }

    const cities = this.props.restaurants.cities.map((city) => {
      return (<li key={city.id}
        onClick={this.handleClick}
        id={city.id}>
        {city.city_name} {city.state}
      </li>);
    });
    const restaurants = this.props.restaurants.restaurants.map((res) => {
      return (<li key={res.id}
        onClick={this.handleClick}
        id={res.id}>
        {res.restaurant_name} {res.city_name} {res.state}
      </li>);
    });

    return (
      <ul className='search-list'>
        <li>Cities</li>
        { cities }
        <li>Restaurants</li>
        { restaurants }
      </ul>
    );
  }

  handleSubmit(e) {

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
    const defaultDate = this.formatDate();
    const head = this.props.header ? this.props.header : "";
    const resultList = this.results();
    const cities = resultList[0];
    const restaurants = resultList[1];

    return (
      <div className='search-bar'>
        <h1>{ head }</h1>
        <div className='search-fields'>
          <form className='seats-form'>
            <select name='seats' className='input bar-seats'>
              { this.seats() }
            </select>
            <input type='date'
              required='required'
              defaultValue={ defaultDate }
              className='input bar-date'
              ></input>
            { this.timeBar() }
            <section className='search-field'>
              <article className='search-box-container'>
                <input
                  type='search'
                  name='query'
                  placeholder='Search Restaurants'
                  className='input'
                  onChange={this.handleChange}
                  value={this.state.searchTerm}></input>
                { this.results() }
              </article>
            </section>
          <input type='submit'
            className='bar-submit'
            value='Search'
            onSubmit={ this.handleSubmit }></input>
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    restaurants: state.restaurants,
    header: ownProps.header,
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    searchRestaurants: query => dispatch(searchRestaurants(query)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
