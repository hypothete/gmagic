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

export function movePoint(id, index, x, y) {
  return {
    type: types.MOVE_POINT,
    payload: { id, index, x, y }
  };
}

export function addPoint(id, x, y) {
  return {
    type: types.ADD_POINT,
    payload: { id, x, y }
  };
}

export function removePoint(id, index) {
  return {
    type: types.REMOVE_POINT,
    payload: { id, index }
  };
}

export function setColor(id, index) {
  return {
    type: types.SET_COLOR,
    payload: { id, index }
  };
}
