import { routerStateReducer as router } from "redux-router";
import { combineReducers } from "redux";
import * as ActionTypes from "../actions";
import { normalize, Schema, arrayOf } from 'normalizr';

const Moment = new Schema('moments');
const Transcript = new Schema('transcripts');
const Mission = new Schema('missions');

Moment.define({
  transcripts: arrayOf(Transcript),
  mission: Mission
});

function moments(state = {
  entities: {},
  result: null,
  loading: true
}, action = {}) {
  switch(action.type) {
    case ActionTypes.FETCH_MOMENT:
      return Object.assign({}, state, {loading: true});
    case ActionTypes.RECEIVE_MOMENT:
      return Object.assign(
        {},
        state,
        {loading: false},
        normalize(
          action.moments,
          Moment
        )
      );
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  moments,
  router
});

export default rootReducer;
