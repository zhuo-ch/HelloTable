import React from 'react';
import { connect } from 'react-redux';
import { updateRestaurant, setError, clearErrors } from '../../actions/manager_actions';
import { setCurrentModal, resetCurrentModal } from '../../actions/modal_actions';
import { merge } from 'lodash';
import * as ManagerUtil from '../../util/manager_util';
import ManagerLi from './manager_li';
import ManagerField from './field';

class ManagerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = { selecting: false, idx: '', value: '' };
  }

  handleClick(e) {
    if (e) {
      e.preventDefault();
      this.setState({ idx: e.currentTarget.id });
    }
    this.setState({ selecting: this.state.selecting ? false : true });
    this.props.restaurant.errors.length > 0
      ? this.props.clearErrors()
      : '';
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  }

  handleSave() {
    const idx = this.state.idx.split('-');
    this.props.setCurrentModal({ hidden: false, type: 'spinner' });

    if (idx[0] === 'phone' && ManagerUtil.invalidPhone(this.state.value)) {
      this.props.setError({ responseJSON: ['Please enter valid number i.e. (XXX)XXX-XXXX or XXX-XXXX-XXXX']});
    } else {
      let dupRestaurant = this.getRestaurantDup();
      dupRestaurant[idx] = this.state.value;
      this.props.updateRestaurant(dupRestaurant).then(() => this.handleClick());
    }
  }

  getRestaurantDup() {
    const restaurant = this.props.restaurant;

    return ({
      id: restaurant.id,
      user_id: restaurant.user_id,
      name: restaurant.name,
      phone: restaurant.phone,
      cuisine: restaurant.cuisine,
      site: restaurant.site,
      address: restaurant.address,
    });
  }

  getField(key, targeted) {
    return ManagerField({
      targeted: targeted,
      id: key,
      text: this.props.restaurant[key],
      change: this.handleChange,
      click: this.handleClick,
    });
  }

  getArticle(key, detail) {
    return (
      <article className='horizontal'>
        { `${key.charAt(0).toUpperCase() + key.slice(1, key.length)}:  ` }
        { detail }
      </article>
    );
  }

  getDetailsItem(key) {
    const listKey = `${key}`;
    const targeted = this.state.selecting && this.state.idx === listKey;
    const detail = this.getField(listKey, targeted);
    const article = this.getArticle(listKey, detail);

    return ManagerLi({
      article: article,
      id: listKey,
      targeted: targeted,
      cName: 'horizontal',
      save: this.handleSave,
      click: this.handleClick,
    });
  }

  getDetailsList() {
    const detailsList = ['name', 'phone', 'address', 'cuisine', 'site'].map(key => {
      return this.getDetailsItem(key);
    });

    return detailsList;
  }

  getDetailsSection() {
    const check = ManagerUtil.checkTarget(this.state);
    const errors = (check && check !== 'hours' && check !== 'seatings')
      ? this.props.restaurant.errors
      : '';
    const details = this.getDetailsList();

    return  ManagerUtil.createSection({
      errors,
      id: 'Details',
      title: 'Details',
      liElements: details,
    });
  }

  render() {
    const detailsSection = this.getDetailsSection();

    return detailsSection;
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  restaurant: state.restaurants.restaurant,
});

const mapDispatchToProps = dispatch => ({
  updateRestaurant: restaurant => dispatch(updateRestaurant(restaurant)),
  setError: error => dispatch(setError(error)),
  clearErrors: () => dispatch(clearErrors()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDetails);
