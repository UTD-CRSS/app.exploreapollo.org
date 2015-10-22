import { routerStateReducer as router } from "redux-router";
import { combineReducers } from "redux";
import * as ActionTypes from "../actions";

function timeline(state = {timeline: []}, action = {}) {
  if (action.type === ActionTypes.RECEIVE_TIMELINE) {
    return Object.assign({}, state, {
      timeline: action.timeline
    });
  }
  return state;
}

function notes(state = {notes: []}, action = {}) {
  if (action.type === ActionTypes.RECEIVE_NOTES) {
    return Object.assign({}, state, {
      notes: action.notes
    });
  }
  return state;
}

const rootReducer = combineReducers({
  timeline,
  notes,
  router
});

export default rootReducer;
