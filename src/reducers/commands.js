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

    case types.MOVE_COMMAND_UP: {
      let foundCmdIndex = state.findIndex(cmd => cmd.id === action.payload.id);
      if (foundCmdIndex <= 0) {
        // if 0 nowhere to move up
        return [...state];
      }
      let foundCmd = state[foundCmdIndex];
      return [
        ...state.slice(0, foundCmdIndex-1),
        { ...foundCmd },
        {...state[foundCmdIndex-1]},
        ...state.slice(foundCmdIndex+1)
      ];
    }

    case types.MOVE_COMMAND_DOWN: {
      let foundCmdIndex = state.findIndex(cmd => cmd.id === action.payload.id);
      if (foundCmdIndex <0 || foundCmdIndex === state.length-1) {
        // if not found or furthest down ignore
        return [...state];
      }
      let foundCmd = state[foundCmdIndex];
      return [
        ...state.slice(0, foundCmdIndex),
        {...state[foundCmdIndex+1]},
        { ...foundCmd },
        ...state.slice(foundCmdIndex+2)
      ];
    }
    
    default:
      return state;
  }
}