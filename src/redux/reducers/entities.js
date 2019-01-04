import initialState from './initialState';
import {SET_CURRENT_ENTITY} from '../actions/actionTypes';

export default function entities(state = initialState.entities, action) {
  switch (action.type) {
    case SET_CURRENT_ENTITY:
      return {
        ...state,
        currentEntity: action.payload
      }
    default:
      return state;
  }
}