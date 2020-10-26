import * as types from './actionTypes';

export const setDistrictsByState = (payload) => {
  return {type: types.SET_DISTRICTS_BY_STATE, payload};
}

export const setBBoxes = (payload) => {
  return {type: types.SET_BBOXES, payload};
}