import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import FontAwesome from 'react-fontawesome';
import ReservationsSnippet from '../restaurant/reservations';
import Scrollchor from 'react-scrollchor';

class UserShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchUser(this.props.currentUser.id)
  }

  render() {
    return(
      <div>
        {currentUser.username}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
    user: state.user,
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    fetchUser: id => dispatch(fetchUser(id)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
