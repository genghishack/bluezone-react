import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

export default function states(state = initialState.states, action) {
  switch (action.type) {
    case actionTypes.SET_DISTRICTS_BY_STATE:
      return {
        ...state,
        districtsByState: action.payload
      };
    case actionTypes.SET_BBOXES:
      return {
        ...state,
        bboxes: action.payload
      };
    default:
      return state;
  }
}