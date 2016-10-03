import { RECEIVE_AUDIO } from "./actions";
import {throttle, isFunction} from "lodash";
import ga from "ga";

// Tracks page-views and audio play times.
export function googleAnalytics(store) {
  // This constant isn't exported from redux-router so I'm having to redefine it.
  // It's a bit of a hack and makes the Google Analytics code dependent on redux-router's internal implementation.
  // The better way to do this is to subscribe to the react router using browserHistory,
  // but redux and redux-router make it difficult to access browswerHistory in a middleware function..
  const ROUTER_DID_CHANGE = "@@reduxReactRouter/routerDidChange";

  const gaMomentEventCategory = "Moment";
  const gaPlayTimeEventAction = "playTime";
  const gaPlayTimeEventIntervalInMilliseconds = 5000;

  // Some helper functions.
  const sendPlayTimeEvent = throttle(function(playTimeInMilliseconds) {
    if (isFunction(ga)) {
      ga("send", "event", gaMomentEventCategory, gaPlayTimeEventAction, store.getState().audio.momentId, playTimeInMilliseconds);
    }
  }, gaPlayTimeEventIntervalInMilliseconds);
  
  // Return a function handling actions.
  return next => action => {
    switch (action.type) {
      case ROUTER_DID_CHANGE:
        // Send a page-view.
        if (isFunction(ga)) {
          ga("set", "page", action.payload.location.pathname + action.payload.location.search);
          ga("send", "pageview");
        }

        break;
      case RECEIVE_AUDIO:
        const isPlaying = !!store.getState().audio.playing || !!action.playing;
        if (isPlaying && action.time) {
          // Audio has started playing, so start sending play time events.
          sendPlayTimeEvent(action.time);
        }

        break;
    }

    return next(action);
  };
}
