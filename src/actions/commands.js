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