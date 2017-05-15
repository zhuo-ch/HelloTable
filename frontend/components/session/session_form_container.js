import { connect } from 'react-redux';
import { login, signup, receiveErrors } from '../../actions/session_actions';
import SessionForm from './session_form';
import { resetCurrentModal, setCurrentModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return ({
    current_user: state.session.current_user,
    logged_in: Boolean(state.session.current_user),
    errors: state.session.errors,
    formType: state.modal.type,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    resetCurrentModal: () => dispatch(resetCurrentModal()),
    setCurrentModal: modal => dispatch(setCurrentModal(modal)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
