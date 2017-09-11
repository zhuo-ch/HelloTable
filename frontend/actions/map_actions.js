import * as MapUtil from '../util/map_util';

export const RECEIVE_MAP_DATA = 'RECEIVE_MAP_DATA';

export const fetchMapData = address => dispatch => {
  return MapUtil.fetchMapData(address)
    .then(data => {
      dispatch(receiveMapData(data))});
}

const receiveMapData = data => ({
  type: RECEIVE_MAP_DATA,
  data
});
