import * as types from './actionTypes';

export function setCurrentEntity(id) {
  return {type: types.SET_CURRENT_ENTITY, payload: id};
}

export function farmTreeClick(bool) {
  return {type: types.SET_FARM_TREE_VISIBLE, payload: bool };
}