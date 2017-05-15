import { connect } from 'react-redux';
import { login, signup, receiveErrors } from '../../actions/session_actions';
import SessionForm from './session_form';
import { resetCurrentModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    current_user: state.session.current_user,
    logged_in: Boolean(state.session.current_user),
    errors: state.session.errors,
    formType: state.modal.type,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    login: (user) => dispatch(login(user)),
    processForm: (user) => dispatch(action({user})),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    resetCurrentModal: () => dispatch(resetCurrentModal()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
