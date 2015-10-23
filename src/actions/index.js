export const RECEIVE_MOMENT = "RECEIVE_MOMENT";
export const FETCH_MOMENT = "FETCH_MOMENT";

import {
  dummyMoments
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
