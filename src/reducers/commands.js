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

    case types.MOVE_POINT: {
      const {id, index, x, y} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            points: cmd.points.map((pt, idx) => {
              if (idx === index) {
                return x;
              }
              else if(idx === index+1) {
                return y;
              }
              return pt;
            })
          }
        }
        return cmd;
      })
    }

    case types.ADD_POINT: {
      const {id, x, y} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            points: [
              ...cmd.points,
              x,
              y
            ]
          }
        }
        return cmd;
      });
    }

    case types.REMOVE_POINT: {
      const {id, index} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            points: cmd.points.splice(index, 2)
          }
        }
        return cmd;
      });
    }

    case types.SET_COLOR: {
      const {id, index} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            colorId: index
          }
        }
        return cmd;
      });
    }
    
    default:
      return state;
  }
}