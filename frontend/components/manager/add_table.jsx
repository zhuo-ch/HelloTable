import React from 'react';
import { connect } from 'react-redux';
import * as ManagerUtil from '../../util/manager_util';
import { createSeating, clearErrors } from '../../actions/manager_actions';
import { resetCurrentModal } from '../../actions/modal_actions';

class AddTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  }

  handleSave(e) {
    e.preventDefault();
    this.props.createSeating({
      restaurant_id: this.props.restaurant.id,
      seats: this.state.seats,
      max_tables: this.state.max_tables,
    });
  }

  handleCancel() {
    this.props.resetCurrentModal();
  }

  getInputs() {
    const inputs = ['seats', 'max_tables'].map(el => {
      return (
        <section>
          {
            ManagerUtil.createInput({
              key: el,
              id: el,
              cName: 'editable-input',
              changeHandler: this.handleChange,
            })
          }
        </section>
      )
    });

    return inputs;
  }

  getButtons() {
    return ManagerUtil.getEditButtons({
      onSave: this.handleSave,
      onCancel: this.handleCancel,
      cName: 'horizontal',
    });
  }

  render() {
    const inputs = this.getInputs();
    const buttons = this.getButtons();
    const errors = this.props.restaurant.errors;

    return (
      <div className='review-form-container manager-add-table'>
        <section className='user-show-res-header horizontal'><h2>Add Tables</h2></section>
        <section className='errors'>{ errors }</section>
        <section>Number of seats:</section>
        <section>{ inputs[0] }</section>
        <section>Maximum tables:</section>
        <section>{ inputs[1] }</section>
        { buttons }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  restaurant: state.restaurants.restaurant,
});

const mapDispatchToProps = dispatch => ({
  createSeating: seating => dispatch(createSeating(seating)),
  clearErrors: () => dispatch(clearErrors()),
  resetCurrentModal: () => dispatch(resetCurrentModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTable);
