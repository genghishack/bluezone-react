import initialState from './initialState';
import {SET_LEGISLATORS} from "../actions/actionTypes";

export default function legislators(state = initialState.legislators, action) {
  switch (action.type) {
    case SET_LEGISLATORS:
      return {
        ...state,
        legislators: action.payload
      };
    default:
      return state;
  }
}
