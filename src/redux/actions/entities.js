import * as types from './actionTypes';

export function setCurrentEntity(payload) {
  return {type: types.SET_CURRENT_ENTITY, payload: payload};
}

export function farmTreeClick(bool) {
  return {type: types.SET_FARM_TREE_VISIBLE, payload: bool };
}