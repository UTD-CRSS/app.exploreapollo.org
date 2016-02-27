import { routerStateReducer as router } from "redux-router";
import { combineReducers } from "redux";
import * as ActionTypes from "../actions";
import { normalize, Schema, arrayOf } from "normalizr";
import _ from "lodash";
import {fromJS} from "immutable";

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
const initialStoryState = {momentList: [], loading: true};
const initialStoriesState = {stories: [], loading: true};

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
          _.isArray(action.moments) ? arrayOf(Moment) : Moment
        )
      );
    default:
      return state;
  }
}

function story(state = initialStoryState, action = {}) {
  switch(action.type) {
    case ActionTypes.FETCH_STORY:
      return Object.assign({}, state, {loading: true});
    case ActionTypes.RECEIVE_STORY:
      return Object.assign(
        {},
        state,
        {loading: false},
        action.story
      );
    default:
      return state;
  }
}

function stories(state = initialStoriesState, action = {}) {
  switch(action.type) {
    case ActionTypes.FETCH_STORIES:
      return Object.assign({}, state, {loading: true});
    case ActionTypes.RECEIVE_STORIES:
      return Object.assign(
        {},
        state,
        {
          loading: false,
          stories: action.stories
        }
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
        {
          loading: false,
          transcripts: fromJS(action.transcripts)
        }
      );
    default:
      return state;
  }
}

function audio(state = initialAudioState, action = {}) {
  switch(action.type) {
    case ActionTypes.FETCH_AUDIO:
      return Object.assign({}, state, {time: null, playing: false});
    case ActionTypes.RECEIVE_AUDIO:
      return Object.assign(
        {},
        state,
        _.omitBy({
          loading: false,
          momentId: action.momentId,
          playing: action.playing,
          time: action.time
        }, _.isUndefined)
      );
    default:
      return state;
  }
}

function metrics(state = {}, action = {}) {
  switch(action.type) {
    case ActionTypes.FETCH_METRICS:
      return Object.assign({}, state, {loading: true});
    case ActionTypes.RECEIVE_METRICS:
      const metrics = fromJS(action.metrics);
      return Object.assign(
        {},
        state,
        {loading: false},
        {
          WordCount: metrics.filter((metric) => {
            return metric.get("type") === "WordCount";
          })
        }
      );
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  transcripts,
  moments,
  story,
  audio,
  stories,
  metrics,
  router
});

export default rootReducer;
