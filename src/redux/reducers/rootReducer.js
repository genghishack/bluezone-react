import {combineReducers} from 'redux';
import errors from './errors';
import entities from "./entities";
import states from './states';

const rootReducer = combineReducers({
  errors,
  entities,
  states
});

export default rootReducer;