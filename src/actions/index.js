export const RECEIVE_MOMENT = "RECEIVE_MOMENT";
export const FETCH_MOMENT = "FETCH_MOMENT";

import {
  dummyMoments,
  dummyTranscripts
} from "../utils/dummyData";
import {delay, random} from "lodash";

function receiveMoments(args) {
  const {moments} = args;
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
    const moments = dummyMoments[momentId];
    // simulate async request
    delay(() => {
      if (moments) {
        dispatch(receiveMoments({
          moments
        }));
      }
    }, random(1, 5) * 200);
  };
}

export const RECEIVE_TRANSCRIPTS = "RECEIVE_TRANSCRIPTS";
export const FETCH_TRANSCRIPTS = "FETCH_TRANSCRIPTS";
function fetchTranscripts() {
  return {
    type: FETCH_TRANSCRIPTS
  };
}

function receiveTranscripts(args) {
  const {transcripts} = args;
  return {
    type: RECEIVE_TRANSCRIPTS,
    transcripts
  };
}

export function loadTranscripts() { //can pass args
  //const {momentId} = args; // TODO: use this
  return dispatch => {
    dispatch(fetchTranscripts());
    // simulate async request
    delay(() => {
      if (dummyTranscripts) {
        dispatch(receiveTranscripts({
          transcripts: dummyTranscripts
        }));
      }
    }, random(1, 5) * 200);
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
  audio, time, playing
}) {
  return {
    type: RECEIVE_AUDIO,
    playing,
    audio,
    time
  };
}

export function loadAudio({
  audio, time, playing
}) {
  return dispatch => {
    dispatch(receiveAudio({
      playing,
      audio,
      time
    }));
  };
}
