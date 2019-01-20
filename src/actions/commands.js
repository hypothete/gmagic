import * as types from './actionTypes';

let commandCount = 0;

export function addCommand(command) {
  return {
    type: types.ADD_COMMAND,
    payload: {
      ...command,
      id: ++commandCount
    }
  };
}

export function removeCommand(command) {
  return {
    type: types.REMOVE_COMMAND,
    payload: command
  }
}

export function moveCommandUp(command) {
  return {
    type: types.MOVE_COMMAND_UP,
    payload: command
  }
}

export function moveCommandDown(command) {
  return {
    type: types.MOVE_COMMAND_DOWN,
    payload: command
  }
}
