import React from 'react';
import { connect } from 'react-redux';
import { fetchAllCities } from '../actions/city_actions';
import { Link } from 'react-router';

class SplashIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllCities();
  }

  render () {
    const cities = Object.keys(this.props.cities).map((id) => {
      <li>
        <Link className='splash-img'>
          <img src={this.props.cities[id].main_photo}/>
        </Link>
      </li>
    })
    debugger
    return (
      <div className='featured-areas-splash'>
        <section>
          <h2>Featured Cities</h2>
        </section>
        <section>
          <ul>
            {

            }
          </ul>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    cities: state.cities,
  })
};

const mapDispatchToProps = dispatch => ({
  fetchAllCities: () => dispatch(fetchAllCities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashIndex);
