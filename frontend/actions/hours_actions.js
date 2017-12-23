import * as HoursAPIUtil from '../util/hous_api_util';

export const RECEIVE_HOUR = 'RECEIVE_HOUR';

export const updateHour = hours => dispatch => {
  return HoursAPIUtil.updateHours(hours)
    .then(updatedHour => dispatch(receiveHour(updatedHour)),
    error => {
      dispatch(resetCurrentModal());
      dispatch(receiveErrors(error))
    });
}

const receiveHour = hour => ({
  type: RECEIVE_HOUR,
  hour,
});
