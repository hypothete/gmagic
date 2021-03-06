import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function commandsReducer(state = initialState.commands, action) {
  switch (action.type) {
    
    case types.ADD_COMMAND:
      return [
        ...state,
        {
          id: action.payload.id,
          name: `cmd-${action.payload.id}`,
          type: action.payload.type,
          points: [],
          colors: [0,7],
          pattern: [
            false, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false
          ]
        }
      ];
    
    case types.REMOVE_COMMAND:
      return [
        ...state.filter(comm => comm.id !== action.payload.id)
      ];

      case types.ADD_BACKGROUND:
      return [
        {
          id: action.payload.id,
          name: `Background-${action.payload.id}`,
          type: action.payload.type,
          points: [0,0, 127,0, 127,127, 0,127],
          colors: [7,0],
          pattern: [
            false, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false
          ]
        },
        ...state
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
      const {id, color, index} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            colors: cmd.colors.map((someCol, someIndex) => {
              if (index === someIndex) {
                return color;
              }
              return someCol;
            })
          }
        }
        return cmd;
      });
    }

    case types.NAME_COMMAND: {
      const {id, name} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            name
          }
        }
        return cmd;
      });
    }

    case types.SET_PATTERN: {
      const {id, pattern} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            pattern: [...pattern]
          }
        }
        return cmd;
      });
    }

    case types.SET_COMMANDS: {
      // TODO: some command validation
      return [
        ...action.payload
      ];
    }

    case types.MOVE_COMMAND: {
      const {id, x, y} = action.payload;
      return state.map(cmd => {
        if (cmd.id === id) {
          return {
            ...cmd,
            points: cmd.points.map((pt, index) => {
              if (index % 2 === 0) {
                // x
                return pt + x;
              }
              else {
                // y
                return pt + y;
              }
            })
          }
        }
        return cmd;
      });
    }

    case types.COPY_COMMAND: {
      const newCmd = action.payload;
      return [
        ...state,
        newCmd
      ];
    }

    case types.CHANGE_COMMAND_TYPE: {
      return state.map(cmd => {
        if (cmd.id === action.payload) {
          return {
            ...cmd,
            type: cmd.type === 'POLYGON' ? 'LINE' : 'POLYGON'
          };
        }
        return cmd;
      })
    }
    
    default:
      return state;
  }
}