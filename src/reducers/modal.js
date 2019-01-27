import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function modalReducer(state = initialState.modalOpen, action) {
  switch (action.type) {
    
    case types.OPEN_MODAL:
      return true;

    case types.CLOSE_MODAL:
      return false;

    default:
      return state;
  }
}