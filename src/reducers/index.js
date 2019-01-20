import { combineReducers } from 'redux';

import commandsReducer from './commands';

export default combineReducers({
  commands: commandsReducer
});
