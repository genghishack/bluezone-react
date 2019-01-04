import * as types from './actionTypes';

export function setCurrentEntity(id) {
  console.log(id, "entity actions");
  return {type: types.SET_CURRENT_ENTITY, payload: id};
}