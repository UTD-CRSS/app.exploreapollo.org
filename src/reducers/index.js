//import { routerStateReducer as router } from "redux-router";
import { combineReducers } from "redux";
import * as ActionTypes from "../actions";
import { normalize, schema } from "normalizr";
import _ from "lodash";
import { fromJS } from "immutable";

const Moment = new schema.Object("moments");
//const Transcript = new Schema("transcripts");
const Mission = new schema.Object("missions");

Moment.define({
  //transcripts: arrayOf(Transcript), //removed from moment
  mission: Mission,
});

//TODO: figure this out
// Transcripts.define({
//   transcripts: arrayOf(Transcript)
// });

const initialMomentState = { entities: {}, result: null, loading: false };
const initialTranscriptState = { transcripts: [], loading: false };
const initialAudioState = { audio: null, time: 0 };
const initialStoryState = { momentList: [], loading: false };
const initialStoriesState = { stories: [], loading: false };

function moments(state = initialMomentState, action = {}) {
  switch (action.type) {
    case ActionTypes.ROUTER_DID_CHANGE:
      // Clear moments to ensure the search results section is empty.
      return action.payload.location.pathname === "/search"
        ? Object.assign({}, state, { entities: {} })
        : state;
    case ActionTypes.FETCH_MOMENT:
      return Object.assign({}, state, { loading: true });
    case ActionTypes.RECEIVE_MOMENT:
      return Object.assign(
        {},
        state,
        { loading: false },
        normalize(
          action.moments,
          _.isArray(action.moments) ? schema.Array(Moment) : Moment
        )
      );
    default:
      return state;
  }
}

function story(state = initialStoryState, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH_STORY:
      return Object.assign({}, state, { loading: true });
    case ActionTypes.RECEIVE_STORY:
      return Object.assign({}, state, { loading: false }, action.story);
    default:
      return state;
  }
}

function stories(state = initialStoriesState, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH_STORIES:
      return Object.assign({}, state, { loading: true });
    case ActionTypes.RECEIVE_STORIES:
      return Object.assign({}, state, {
        loading: false,
        stories: action.stories,
      });
    default:
      return state;
  }
}

function transcripts(state = initialTranscriptState, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH_TRANSCRIPTS:
      return Object.assign({}, state, { loading: true });
    case ActionTypes.RECEIVE_TRANSCRIPTS:
      return Object.assign({}, state, {
        loading: false,
        transcripts: fromJS(action.transcripts),
      });
    default:
      return state;
  }
}

function audio(state = initialAudioState, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH_AUDIO:
      return Object.assign({}, state, { time: null, playing: false });
    case ActionTypes.RECEIVE_AUDIO:
      return Object.assign(
        {},
        state,
        _.omitBy(
          {
            loading: false,
            momentId: action.momentId,
            playing: action.playing,
            time: action.time,
          },
          _.isUndefined
        )
      );
    default:
      return state;
  }
}

export function metrics(mets) {
  return Object.assign(
    {},
    {},
    { loading: false },
    {
      Speakers: mets.filter((metric) => {
        return metric["type"] === "Speakers";
      }),
      TurnCount: mets.filter((metric) => {
        return metric["type"] === "Nturns";
      }),
      WordCount: mets.filter((metric) => {
        return metric["type"] === "WordCount";
      }),
      ConversationCount: mets.filter((metric) => {
        return metric["type"] === "ConversationCount";
      }),
      InteractionMatrix: mets.filter((metric) => {
        return metric["type"] === "InteractionMatrix";
      }),
    }
  );
}

const rootReducer = combineReducers({
  transcripts,
  moments,
  story,
  audio,
  stories,
  metrics,
  //router
});

export default rootReducer;
