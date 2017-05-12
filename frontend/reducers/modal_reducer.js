import { RECEIVE_CURRENT_MODAL, RECEIVE_RESET_MODAL } from '../actions/modal_actions';

const _nullModal = {
  type: '',
  hidden: true,
}

const ModalReducer = (state = _nullModal, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_MODAL:
      return action.modal;
    case RECEIVE_RESET_MODAL:
      return _nullModal;
    default:
      return _nullModal;
  }
}

export default ModalReducer;
