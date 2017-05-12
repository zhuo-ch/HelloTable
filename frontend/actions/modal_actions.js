export const RECEIVE_CURRENT_MODAL = 'RECEIVE_CURRENT_MODAL';
export const RECEIVE_RESET_MODAL = 'RECEIVE_RESET_MODAL';

export const setCurrentModal = modal => dispatch => {
  dispatch(receiveCurrentModal(modal));
}

export const resetCurrentModal = () => dispatch => {
  dispatch(receiveResetModal());
}

const receiveCurrentModal = modal => ({
  type: RECEIVE_CURRENT_MODAL,
  modal,
})

const receiveResetModal = () => ({
  type: RECEIVE_RESET_MODAL,
})
