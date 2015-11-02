import { routerStateReducer as router } from "redux-router";
import { combineReducers } from "redux";
import * as ActionTypes from "../actions";
import { normalize, Schema } from "normalizr"; //arrayOf

const Moment = new Schema("moments");
//const Transcript = new Schema("transcripts");
const Mission = new Schema("missions");

Moment.define({
  //transcripts: arrayOf(Transcript), //removed from moment
  mission: Mission
});

//TODO: figure this out
// Transcripts.define({ 
//   transcripts: arrayOf(Transcript)
// });

const initialMomentState = {entities: {}, result: null, loading: true};
const initialTranscriptState = {transcripts: [], loading: true};
const initialAudioState = {audio: null, time: 0};

function moments(state = initialMomentState, action = {}) {
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

function transcripts(state = initialTranscriptState, action = {}) {
  switch(action.type) {
  case ActionTypes.FETCH_TRANSCRIPTS:
    return Object.assign({}, state, {loading: true});
  case ActionTypes.RECEIVE_TRANSCRIPTS:
    return Object.assign(
      {},
      state,
      {loading: false},
      {transcripts: action.transcripts}
      // normalize(
      //   action.transcripts,
      //   Moment
      // )
    );
  default:
    return state;
  }
}

function audio(state = initialAudioState, action = {}) {
  switch(action.type) {
  case ActionTypes.FETCH_AUDIO:
    return Object.assign({}, state);
  case ActionTypes.RECEIVE_AUDIO:
    return Object.assign(
      {},
      state,
      {loading: false},
      {audio: action.audio},
      {time: action.time}
    );
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  transcripts,
  moments,
  audio,
  router
});

export default rootReducer;
