import { combineReducers } from 'redux';

import commandsReducer from './commands';
import activeCommandReducer from './activeCommand';
import drawingModeReducer from './drawingMode'
import modalReducer from './modal';

export default combineReducers({
  commands: commandsReducer,
  activeCommand: activeCommandReducer,
  drawingMode: drawingModeReducer,
  modalOpen: modalReducer
});
