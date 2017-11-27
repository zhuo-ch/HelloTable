import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './review/review_form';
import ThankYou from './review/thank_you';
import SessionForm from './session/session_form_container';
import { merge } from 'lodash';
import { resetCurrentModal } from '../actions/modal_actions';
import CreateRestaurant from './restaurant/restaurant_create';
import AddTable from './manager/add_table';

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.hideModal = this.hideModal.bind(this);
    this.getSpinner = this.getSpinner.bind(this);
  }

  hideModal(e) {
    e.preventDefault();
    this.props.resetCurrentModal();
  }

  getSpinner() {
    return (
      <div className='spinner-cover'>
        <div className='spinner-container'>
          <i className='icon fa fa-spinner fa-5x fa-pulse'></i>
        </div>
      </div>
    )
  }

  getCurrentModal() {
    switch (this.props.modal.type) {
      case 'reviewForm':
        return <ReviewForm />
      case 'thankyou':
        return <ThankYou resetCurrentModal={ this.props.resetCurrentModal }/>
      case 'login':
        return <SessionForm />
      case 'signup':
        return <SessionForm />
      case 'create':
        return <CreateRestaurant />
      case 'spinner':
        return this.getSpinner();
      case 'addTable':
        return <AddTable
          saveHandler={ this.props.modal.clickHandler }
          cancelHandler={ this.props.resetCurrentModal }
          changeHandler={ this.props.modal.changeHandler }
          errors={ this.props.modal.errors }/>
      default:
        return '';
    }
  }

  render() {
    const currentModal = this.getCurrentModal();
    const currentClassName = this.props.modal.hidden ? 'hidden' : '';

    return (
      <div className='modal' id={ currentClassName }>
        <div className='overlay' onClick={this.hideModal}></div>
        { currentModal }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
})

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
