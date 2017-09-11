import { merge } from 'lodash';
import { RECEIVE_MAP_DATA } from '../actions/map_actions';

const _nullMap = {};

const MapReducer = (state = _nullMap, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MAP_DATA:
    debugger
      return merge({}, state, action.data);
    default:
      return state;
  }
}

export default MapReducer;
