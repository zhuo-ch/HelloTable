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

  componentWillMount() {
    this.props.fetchManagerRestaurant(this.props.currentUser.id);
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
  restaurant: state.Manager.restaurant,
});

const mapDispatchToProps = dispatch => ({
  resetCurrentModal: () => dispatch(resetCurrentModal()),
  setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  fetchManagerRestaurant: id => dispatch(fetchManagerRestaurant(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
