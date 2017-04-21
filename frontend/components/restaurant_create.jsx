import React from 'react';
import { connect } from 'react-redux';
import { createRestaurant } from '../actions/restaurant_actions';

class CreateRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurant_name: '',
                      restaurant_number: '',
                      description: '',
                      hours: '',
                      cuisine: '',
                      street_address: '',
                      city: '',
                      state: '',
                      site: '',
                      owner_id: this.props.currentUser.id,
                    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const action = e.currentTarget.className;
    this.setState({[action]: e.currentTarget.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const restaurant = this.state;
    this.props.createRestaurant(restaurant)
      .then((newRestaurant) => this.props.router.push(`/restaurant/${newRestaurant.id}`));
  }

  render() {
    return (
      <section className='restaurant-create'>
        <article>
          <h2>Add Your Restaurant!</h2>
        </article>
        <form>
          <input type='text' className='restaurant_name'
            onChange={this.handleChange}
            placeholder='Name of Your Restaurant'></input>
          <input type='text' className='description'
            onChange={this.handleChange}
            placeholder='Restaurant Description'></input>
          <input type='text' className='hours'
            onChange={this.handleChange}
            placeholder='Restaurant Hours'></input>
          <input type='text' className='cuisine'
            onChange={this.handleChange}
            placeholder='Type of Cuisine'></input>
          <input type='text' className='restaurant_number'
            onChange={this.handleChange}
            placeholder='Contact Phone Number'></input>
          <input type='text' className='street_address'
            onChange={this.handleChange}
            placeholder='Street Address'></input>
          <input type='text' className='city'
            onChange={this.handleChange}
            placeholder='City'></input>
          <input type='text' className='state'
            onChange={this.handleChange}
            placeholder='State'></input>
          <input type='text' className='site'
            onChange={this.handleChange}
            placeholder='Website'></input>
          <input type='submit'
            onClick={this.handleSubmit}
            className="button"
            value='Add Restaurant!'></input>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser
  })
};

const mapDispatchToProps = dispatch => {
  return ({
    createRestaurant: (restaurant) => dispatch(createRestaurant(restaurant)),
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRestaurant);
