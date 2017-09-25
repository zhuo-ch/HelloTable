import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createRestaurant } from '../../actions/restaurant_actions';
import { resetCurrentModal, setCurrentModal } from '../../actions/modal_actions';

class CreateRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imageUrls: [], imageFiles: []}
    this.restaurant = { restaurant_name: '',
                      restaurant_number: '',
                      description: '',
                      hours: '',
                      cuisine: '',
                      street_address: '',
                      name: '',
                      state: '',
                      site: '',
                      lat: '',
                      lng: '',
                      imageFiles: [],
                      imageUrls: [],
                      owner_id: this.props.currentUser.id,
                    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleFile = this.handleFile.bind(this);
  this.handleError = this.handleError.bind(this);
  this.renderErrors = this.renderErrors.bind(this);
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const imageFiles = this.state.imageFiles.slice();
      imageFiles.push(file);
      const imageUrls = this.state.imageUrls.slice();
      imageUrls.push(fileReader.result);
      if (imageUrls.length > 3) {
        imageUrls.splice(0, 1);
      }
      this.setState({ imageFiles, imageUrls})
    }

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleChange(e) {
    e.preventDefault();
    const action = e.currentTarget.name;
    this.restaurant[action] = e.currentTarget.value;
  }

  handleError() {
    setTimeout(() => this.props.setCurrentModal({ hidden: false, type: 'create' }), 500);
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('restaurant[restaurant_name]', this.restaurant.restaurant_name);
    formData.append('restaurant[restaurant_number]', this.restaurant.restaurant_number);
    formData.append('restaurant[description]', this.restaurant.description);
    formData.append('restaurant[hours]', this.restaurant.hours);
    formData.append('restaurant[cuisine]', this.restaurant.cuisine);
    formData.append('restaurant[street_address]', this.restaurant.street_address);
    formData.append('restaurant[name]', this.restaurant.name);
    formData.append('restaurant[state]', this.restaurant.state);
    formData.append('restaurant[site]', this.restaurant.site);
    formData.append('restaurant[owner_id]', this.restaurant.owner_id);
    this.state.imageFiles.forEach((data, idx) => {
      formData.append('imageFiles[]', data);
    });

    this.props.setCurrentModal({ hidden: false, type: 'spinner' });
    this.props.createRestaurant(formData)
      .then(r => this.props.router.push(`restaurant/${r.restaurant.id}`), () => this.handleError())
      .then(() => this.props.resetCurrentModal());
  }

  renderErrors() {
    const errors = this.props.errors.join('. ') + '.'
    return (<h5>{ errors }</h5>)
  }

  render() {
    return (
      <div className='res-create-container'>
        <section className='restaurant-create'>
          <article>
            <h2>Add Your Restaurant!</h2>
          </article>
          <form>
            <section className='create-top'>
              <section className='create-left'>
                <input type='text' className='restaurant_name input'
                  name='restaurant_name'
                  onChange={this.handleChange}
                  placeholder='Name of Your Restaurant'></input>
                <input type='text' className='description input'
                  name='description'
                  onChange={this.handleChange}
                  placeholder='Restaurant Description'></input>
                <input type='text' className='hours input'
                  name='hours'
                  onChange={this.handleChange}
                  placeholder='Restaurant Hours'></input>
                <input type='text' className='cuisine input'
                  name='cuisine'
                  onChange={this.handleChange}
                  placeholder='Type of Cuisine'></input>
                <input type='text' className='restaurant_number input'
                  name='restaurant_number'
                  onChange={this.handleChange}
                  placeholder='Contact Phone Number'></input>
                <input type='text' className='street_address input'
                  name='street_address'
                  onChange={this.handleChange}
                  placeholder='Street Address'></input>
                <input type='text' className='city-name input'
                  name='city-name'
                  onChange={this.handleChange}
                  placeholder='City'></input>
                <input type='text' className='state input'
                  name='state'
                  onChange={this.handleChange}
                  placeholder='State'></input>
                <input type='text' className='site input'
                  name='site'
                  onChange={this.handleChange}
                  placeholder='Website'></input>
              </section>
              <section className='create-right'>
                <input type='file'
                  onChange={this.handleFile}
                  className='upload-button'></input>
                <ul className='upload-images'>
                  {
                    this.state.imageUrls.map((image, idx) => {
                      return (
                        <li key={idx} className='upload-image'>
                          <img src={image} />
                        </li>
                      )
                    })
                  }
                </ul>
              </section>
            </section>
            <section className='create-bottom'>
              <section className='errors'>
                { this.renderErrors() }
              </section>
              <input type='submit'
                onClick={this.handleSubmit}
                className="button input"
                value='Add Restaurant!'></input>
            </section>
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
    errors: state.restaurants.errors,
  })
};

const mapDispatchToProps = dispatch => {
  return ({
    createRestaurant: restaurant => dispatch(createRestaurant(restaurant)),
    resetCurrentModal: () => dispatch(resetCurrentModal()),
    setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  })
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRestaurant));
