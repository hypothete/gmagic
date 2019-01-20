import { combineReducers } from 'redux';

import commandsReducer from './commands';
import activeCommandReducer from './activeCommand';

export default combineReducers({
  commands: commandsReducer,
  activeCommand: activeCommandReducer
});
