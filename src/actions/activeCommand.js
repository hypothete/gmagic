import * as types from './actionTypes';

export function setActiveCommand(command) {
  return {
    type: types.SET_ACTIVE_COMMAND,
    payload: command.id
  };
}