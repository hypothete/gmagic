import { combineReducers } from 'redux';

import commandsReducer from './commands';
import activeCommandReducer from './activeCommand';
import drawingModeReducer from './drawingMode'

export default combineReducers({
  commands: commandsReducer,
  activeCommand: activeCommandReducer,
  drawingMode: drawingModeReducer
});
