import React from 'react';
import { connect } from 'react-redux';
import { fetchAllCities } from '../../actions/city_actions';
import { Link } from 'react-router';
import SearchBar from '../search/search_bar';
import CreateRestaurantSplash from '../restaurant/create_splash';
import { setCurrentModal } from '../../actions/modal_actions';

class CityIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllCities();
  }

  handleCreate() {
    if (this.currentUser) {
      this.props.setCurrentModal({hidden: false, type: 'create'});
    } else {
      this.props.setCurrentModal({hidden: false, type: 'login'});
    }
  }

  render () {
    const cities = [];

    Object.keys(this.props.cities).slice(0,6).forEach((id) => {
      cities.push(
        <li className='splash-img' key={id}>
          <Link to={`cities/${id}`} >
            <img src={ this.props.cities[id].image_url } alt={this.props.cities[id].city_name}/>
            <h2>{ this.props.cities[id].city_name }</h2>
          </Link>
        </li>
      )
    })

    const citiesNames = Object.keys(this.props.cities).map((id) => {
      return (
        <li className='splash-city-name' key={id}>
          <Link to={`cities/${id}`} >
            <h4>{ this.props.cities[id].city_name }</h4>
          </Link>
        </li>
      )
    });

    return (
      <div className='city-index-splash'>
        <section className='restaurants-index-splash'>
          <SearchBar header={'Say goodbye hassle, and say hello table'}/>
        </section>
        <div className='featured-areas-splash'>
          <h2 className='splash-header'>Featured Cities</h2>
          <ul className='splash-images'>
            { cities }
          </ul>
          <ul className='splash-city-names'>
            { citiesNames }
          </ul>
          <div className='create-splash'>
            <section>
              <button className='button' onClick={this.handleCreate}>Add your Table</button>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    currentUser: state.session.currentUser,
    cities: state.cities,
  })
};

const mapDispatchToProps = dispatch => ({
  fetchAllCities: () => dispatch(fetchAllCities()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityIndex);
