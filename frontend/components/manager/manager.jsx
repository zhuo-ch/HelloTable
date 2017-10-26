import React from 'react';
import { connect } from 'react-redux';
import Modal from '../modal.jsx';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false,
      times: false,
      limits: false,
    }
  }

  getDetails() {

  }

  getTimes() {

  }

  getLimits() {

  }

  getEditButton() {

  }



  render() {
    return (
      <div>
        { getDetails }
        { getTimes }
        { getLimits }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
