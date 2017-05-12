import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './review/review_form';
import { merge } from 'lodash';
import { resetCurrentModal } from '../actions/modal_actions';

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal(e) {
    e.preventDefault();
    this.props.resetCurrentModal();
  }

  getCurrentModal() {
    switch (this.props.modal.type) {
      case 'reviewForm':
        return <ReviewForm />
      default:
        return '';
    }
  }

  render() {
    const currentModal = this.getCurrentModal();
    const currentClassName = this.props.modal.hidden ? 'modal hidden' : 'modal';
    return (
      <div className={ currentClassName } id='modal'>
        <div className='overlay' onClick={this.hideModal}></div>
        Hello World
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
