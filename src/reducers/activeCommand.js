import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function activeCommandReducer(state = initialState.activeCommand, action) {
  switch (action.type) {
    
    case types.SET_ACTIVE_COMMAND:
      return action.payload;
    
    // when addCommand is called, set that command to active
    case types.ADD_COMMAND:
      return action.payload.id;
    
    case types.REMOVE_COMMAND: {
      return (action.payload.id === state) ? null : state;
    }

    default:
      return state;
  }
}