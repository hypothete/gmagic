import * as types from './actionTypes';

export function setDrawingMode(mode) {
  return {
    type: types.SET_DRAWING_MODE,
    payload: mode
  };
}