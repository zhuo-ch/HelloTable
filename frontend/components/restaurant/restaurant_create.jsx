import React from 'react';
import { connect } from 'react-redux';
import { createRestaurant } from '../../actions/restaurant_actions';

class CreateRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurant_name: '',
                      restaurant_number: '',
                      description: '',
                      hours: '',
                      cuisine: '',
                      street_address: '',
                      city_name: '',
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
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const imageFiles = this.state.imageFiles.slice();
      imageFiles.push(file);
      const imageUrls = this.state.imageUrls.slice();
      imageUrls.push(fileReader.result);
      this.setState({ imageFiles, imageUrls})
    }

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleChange(e) {
    e.preventDefault();
    const action = e.currentTarget.className;
    this.setState({[action]: e.currentTarget.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('restaurant[restaurant_name]', this.state.restaurant_name);
    formData.append('restaurant[restaurant_number]', this.state.restaurant_number);
    formData.append('restaurant[description]', this.state.description);
    formData.append('restaurant[hours]', this.state.hours);
    formData.append('restaurant[cuisine]', this.state.cuisine);
    formData.append('restaurant[street_address]', this.state.street_address);
    // formData.append('restaurant[city_name]', this.state.city_name);
    formData.append('restaurant[state]', this.state.state);
    formData.append('restaurant[site]', this.state.site);
    formData.append('restaurant[owner_id]', this.state.owner_id);
    this.state.imageFiles.forEach((data, idx) => {
      formData.append('imageFiles[]', data);
    })

    this.props.createRestaurant(formData);
  }

  render() {
    return (
      <div className='res-create-container'>
        <section className='restaurant-create'>
          <article>
            <h2>Add Your Restaurant!</h2>
          </article>
          <form>
            <input type='text' className='restaurant_name input'
              onChange={this.handleChange}
              placeholder='Name of Your Restaurant'></input>
            <input type='text' className='description input'
              onChange={this.handleChange}
              placeholder='Restaurant Description'></input>
            <input type='text' className='hours input'
              onChange={this.handleChange}
              placeholder='Restaurant Hours'></input>
            <input type='text' className='cuisine input'
              onChange={this.handleChange}
              placeholder='Type of Cuisine'></input>
            <input type='text' className='restaurant_number input'
              onChange={this.handleChange}
              placeholder='Contact Phone Number'></input>
            <input type='text' className='street_address input'
              onChange={this.handleChange}
              placeholder='Street Address'></input>
            <input type='text' className='city_name input'
              onChange={this.handleChange}
              placeholder='City'></input>
            <input type='text' className='state input'
              onChange={this.handleChange}
              placeholder='State'></input>
            <input type='text' className='site input'
              onChange={this.handleChange}
              placeholder='Website'></input>
            <input type='file'
              onChange={this.handleFile}
              className='input'></input>
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
            <input type='submit'
              onClick={this.handleSubmit}
              className="button input"
              value='Add Restaurant!'></input>
          </form>
        </section>
      </div>
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
