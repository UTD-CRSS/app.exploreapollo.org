export const RECEIVE_TIMELINE = "RECEIVE_TIMELINE";
export const FETCH_TIMELINE = "FETCH_TIMELINE";
export const RECEIVE_NOTES = "RECEIVE_NOTES";
export const FETCH_NOTES = "FETCH_NOTES";

import {dummyTimeline, dummyNotes} from "../utils/dummyData";

function receiveTimeline(args) {
  // const {momentId, elements} = args;
  const {elements} = args;
  return {
    type: RECEIVE_TIMELINE,
    timeline: elements
  };
}

export function fetchTimeline() {
  return {
    type: FETCH_TIMELINE
  };
}

export function loadTimeline(args) {
  // const {momentId, met} = args;
  const {momentId} = args;
  return dispatch => {
    dispatch(fetchTimeline());
    return dispatch(receiveTimeline({
      momentId,
      elements: dummyTimeline
    }));
  };
}

export function fetchNotes(args) {
  // const {momentId, met} = args;
  const {momentId} = args;
  return (dispatch) => {
    dispatch(receiveNotes({
      momentId,
      elements: dummyNotes
    }));
    return {
      type: FETCH_NOTES
    };
  };
}

function receiveNotes(args) {
  // const {momentId, elements} = args;
  const {elements} = args;
  return {
    type: RECEIVE_NOTES,
    notes: elements
  };
}
