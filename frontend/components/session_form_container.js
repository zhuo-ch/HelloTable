import { connect } from 'react-redux';
import { login, signup } from '../actions/session_actions';
import SessionForm from './session_form'

const mapStateToProps = (state, ownProps) => ({
  logged_in: state.current_user,
  errors: state.errors,
  formType: ownProps.location.pathname,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = (ownProps.location.pathname === "/login") ? login : signup;
  return ({
    processForm: (user) => dispatch(action({user: user})),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
