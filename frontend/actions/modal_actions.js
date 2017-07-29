export const RECEIVE_CURRENT_MODAL = 'RECEIVE_CURRENT_MODAL';
export const RECEIVE_RESET_MODAL = 'RECEIVE_RESET_MODAL';
const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const setCurrentModal = modal => dispatch => {
  dispatch(receiveCurrentModal(modal));
}

export const resetCurrentModal = () => dispatch => {
  dispatch(receiveErrors([]));
  dispatch(receiveResetModal());
}

const receiveCurrentModal = modal => ({
  type: RECEIVE_CURRENT_MODAL,
  modal,
});

const receiveResetModal = () => ({
  type: RECEIVE_RESET_MODAL,
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
})
