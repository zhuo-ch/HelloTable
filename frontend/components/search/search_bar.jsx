import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { searchRestaurants, findRestaurants, receiveSearchResults } from '../../actions/search_actions';
import FontAwesome from 'react-fontawesome';


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nullSearch: false,
      searchType: "",
      searchId: "",
      searching: false,
      searchTerm: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.timeBar = this.timeBar.bind(this);
    this.seats = this.seats.bind(this);
    this.results = this.results.bind(this);
    this.getSearchBox = this.getSearchBox.bind(this);
  }

  componentWillMount() {
    this.setState({searching: false, searchTerm: ''})
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchTerm === '') {
      this.setState({nullSearch: true});
      return
    }
    let date = e.currentTarget.date.value.split('-')
    date = [date[1], date[2], date[0]].join('-');

    const seats = e.currentTarget.elements.seats.value;
    const time= e.currentTarget.elements.time.value.split("  ")[0].split(":").join("");
    const id = (this.state.searchType === "cities") ? this.state.searchId: this.state.searchId;
    const type = this.state.searchType;
    this.props.receiveSearchResults({seats, date, time, id, type});

    if (!(this.props.restaurantId)) {
      this.props.router.push(`${type}/${id}`)
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({searching: false, searchTerm: e.currentTarget.innerText,
      searchId: e.currentTarget.id, searchType: e.currentTarget.type})
  }

  handleChange(e) {
    e.preventDefault();
    const val = e.currentTarget.value;

    if (val !== "") {
      this.setState({ searching: true, searchTerm: val });
      this.props.searchRestaurants(val);
    } else {
      this.setState({ searching: false, searchTerm: val });
    }

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
    const toggle = (this.state.searching ? 'search-list' : 'no-search');
    const cities = this.props.search.cities.map((city) => {
      return (<li key={city.id * 1000}
        onClick={this.handleClick}
        id={ city.id }
        type='cities'>
        {city.city_name} {city.state}
      </li>);
    });
    const restaurants = this.props.search.restaurants.map((res) => {
      return (<li key={res.id}
        onClick={this.handleClick}
        id={res.id}
        type='restaurant'>
        {res.restaurant_name} {res.city_name} {res.state}
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
    const resultList = this.results();
    let cName;
    let pHolder;

    if (this.state.nullSearch) {
      cName = 'input red';
      pHolder = 'Type here to search';
    } else {
      cName = 'input';
      pHolder = 'Search Restaurants';
    }

    return (
      <section className='search-field'>
        <article className='search-box-container'>
          <input
            type='search'
            name='query'
            placeholder={pHolder}
            className={cName}
            autoComplete='off'
            onChange={this.handleChange}
            value={this.state.searchTerm}></input>
          { resultList }
        </article>
      </section>
    )
  }

  render() {
    const defaultDate = this.formatDate();
    const head = this.props.header ? this.props.header : "";
    const searchBox = this.props.restaurantId ? "" : this.getSearchBox();
    const searchPlaceHolder = this.state._nullSearch

    return (
      <div className='search-bar'>
        <h1>{ head }</h1>
        <div className='search-fields'>
          <form className='seats-form' onSubmit={ this.handleSubmit }>
            <select name='seats' className='input bar-seats'>
              { this.seats() }
            </select>
            <input type='date'
              required='required'
              name='date'
              min = { defaultDate }
              defaultValue={ defaultDate }
              className='input bar-date'
              ></input>
            { this.timeBar() }
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
    searchResults: state.search.searchResults,
    search: state.search,
    header: ownProps.header,
    restaurantId: ownProps.restaurantId
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    searchRestaurants: query => dispatch(searchRestaurants(query)),
    receiveSearchResults: query => dispatch(receiveSearchResults(query)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
