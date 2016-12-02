import {
} from "../utils/dummyData";
import {isArray} from "lodash";

import config from "../../config";

import {fromJS} from "immutable";
import {replaceState} from "redux-router";

export const RECEIVE_MOMENT = "RECEIVE_MOMENT";
export const FETCH_MOMENT = "FETCH_MOMENT";
export const FETCH_METRICS = "FETCH_METRICS";
export const RECEIVE_METRICS = "RECEIVE_METRICS";

// This constant isn't exported from redux-router so I'm having to redefine it.
// It's a bit of a hack and makes the Google Analytics code dependent on redux-router's internal implementation.
// The better way to do this is to subscribe to the react router using browserHistory,
// but redux and redux-router make it difficult to access browserHistory in a middleware function..
export const ROUTER_DID_CHANGE = "@@reduxReactRouter/routerDidChange";

function receiveMoments({moments}) {
  return {
    type: RECEIVE_MOMENT,
    moments
  };
}

function fetchMoments() {
  return {
    type: FETCH_MOMENT
  };
}

export function loadMoments(args) {
  const {momentId} = args;

  return dispatch => {
    dispatch(fetchMoments());
    fetch(`${config.apiEntry}/api/moments/${momentId}`)
      .then((response) => {
        return response.json();
      })
      .then((moment) => {
        moment.media = fromJS(moment.media);
        dispatch(receiveMoments({
          moments: moment
        }));
      });
  };
}

export function searchMomentsByTranscript(transcriptSnippet) {
  return dispatch => {
    dispatch(fetchMoments());
    fetch(`${config.apiEntry}/api/moments/search?q=${transcriptSnippet}`)
      .then((response) => {
        return response.json();
      })
      .then((moment) => {
        moment.media = fromJS(moment.media);
        dispatch(receiveMoments({
          moments: moment
        }));
      });
  };
}

export function redirectToRandomMoment() {
  return dispatch => {
    fetch(`${config.apiEntry}/api/moments/random`)
      .then((response) => {
        return response.json();
      })
      .then((moment) => {
        moment.media = fromJS(moment.media);
        dispatch(replaceState(null, `/moments/moment/${moment.id}`));
      });
  };
}

function fetchMetrics() {
  return {
    type: FETCH_METRICS
  };
}

function receiveMetrics({metrics}) {
  return {
    type: RECEIVE_METRICS,
    metrics
  };
}

export function loadMetrics({momentId}) {
  return dispatch => {
    dispatch(fetchMetrics());
    fetch(`${config.apiEntry}/api/moments/${momentId}/metrics`)
      .then((response) => {
        return response.json();
      })
      .then((metrics) => {
        dispatch(receiveMetrics({metrics}));
      });
  };
}

export const RECEIVE_STORY = "RECEIVE_STORY";
export const FETCH_STORY = "FETCH_STORY";
function receiveStory({story}) {
  return {
    type: RECEIVE_STORY,
    story
  };
}

function fetchStory() {
  return {
    type: FETCH_STORY
  };
}

export function loadStory(args) {
  const {storyId} = args;
  return dispatch => {
    dispatch(fetchStory());

    fetch(`${config.apiEntry}/api/stories/${storyId}`)
      .then((response) => {
        return response.json();
      })
      .then((story) => {
        dispatch(receiveStory({
          story
        }));
      });
  };
}

export const RECEIVE_STORIES = "RECEIVE_STORIES";
export const FETCH_STORIES = "FETCH_STORIES";
function receiveStories({stories}) {
  return {
    type: RECEIVE_STORIES,
    stories
  };
}

function fetchStories() {
  return {
    type: FETCH_STORIES
  };
}

export function loadStories() { //could send args... but we're just getting all stories
  return dispatch => {
    dispatch(fetchStories());
    // simulate async request
    fetch(`${config.apiEntry}/api/stories`)
      .then((response) => {
        return response.json();
      })
      .then((stories) => {
        if(isArray(stories) && stories.length > 0) {
          dispatch(receiveStories({
            stories
          }));
        }
      });
  };
}

export const RECEIVE_TRANSCRIPTS = "RECEIVE_TRANSCRIPTS";
export const FETCH_TRANSCRIPTS = "FETCH_TRANSCRIPTS";
function fetchTranscripts() {
  return {
    type: FETCH_TRANSCRIPTS
  };
}

function receiveTranscripts({transcripts}) {
  return {
    type: RECEIVE_TRANSCRIPTS,
    transcripts
  };
}

export function loadTranscripts({momentId}) {
  return dispatch => {
    dispatch(fetchTranscripts());

    fetch(`${config.apiEntry}/api/moments/${momentId}/transcripts`)
      .then((response) => {
        return response.json();
      })
      .then((transcripts) => {
        if(isArray(transcripts) && transcripts.length > 0) {
          dispatch(receiveTranscripts({
            transcripts: transcripts
          }));
        }
      });
  };
}

export const RECEIVE_AUDIO = "RECEIVE_AUDIO";
// export const FETCH_AUDIO = "FETCH_AUDIO";
// function fetchAudio() {
//   return {
//     type: FETCH_AUDIO
//   };
// }

function receiveAudio({
  time, playing, momentId
}) {
  return {
    type: RECEIVE_AUDIO,
    playing,
    time,
    momentId
  };
}

export function loadAudio({
  time, playing, momentId
}) {
  return dispatch => {
    dispatch(receiveAudio({
      playing,
      time,
      momentId
    }));
  };
}
