import * as types from './actionTypes';

export function setCurrentEntity(id) {
  return {type: types.SET_CURRENT_ENTITY, payload: id};
}