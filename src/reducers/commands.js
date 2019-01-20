import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function commandsReducer(state = initialState.commands, action) {
  switch (action.type) {
    
    case types.ADD_COMMAND:
      return [
        ...state,
        action.payload
      ];
    
    case types.REMOVE_COMMAND:
      return [
        ...state.filter(comm => comm.id !== action.payload.id)
      ];
      
    default:
      return state;
  }
}