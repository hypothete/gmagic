import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function drawingModeReducer(state = initialState.drawingMode, action) {
  switch (action.type) {
    
    case types.SET_DRAWING_MODE:
      return action.payload;

    case types.SET_ACTIVE_COMMAND:
      return 'EDIT_POINTS';
    
    case types.ADD_COMMAND:
      return 'ADD_POINTS';
    
    default:
      return state;
  }
}