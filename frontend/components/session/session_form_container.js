import { connect } from 'react-redux';
import { login, signup, receiveErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  return ({
    logged_in: Boolean(state.session.current_user),
    errors: state.session.errors,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname.slice(1);
  const action = (formType === "login") ? login : signup;
  return ({
    login: (user) => dispatch(login(user)),
    processForm: (user) => dispatch(action({user})),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    formType
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
