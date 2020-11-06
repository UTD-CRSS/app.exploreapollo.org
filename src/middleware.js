import { ROUTER_DID_CHANGE, RECEIVE_AUDIO } from "./actions";
import { throttle, isFunction } from "lodash";
import ga from "ga";

// Tracks page-views and audio play times.
export function googleAnalytics(store) {
  const gaMomentEventCategory = "Moment";
  const gaPlayTimeEventAction = "playTime";
  const gaPlayTimeEventIntervalInMilliseconds = 5000;

  // Some helper functions.
  const sendPlayTimeEvent = throttle(function (playTimeInMilliseconds) {
    if (isFunction(ga)) {
      ga(
        "send",
        "event",
        gaMomentEventCategory,
        gaPlayTimeEventAction,
        store.getState().audio.momentId,
        playTimeInMilliseconds
      );
    }
  }, gaPlayTimeEventIntervalInMilliseconds);

  // Return a function handling actions.
  return (next) => (action) => {
    switch (action.type) {
      case ROUTER_DID_CHANGE:
        // Send a page-view.
        if (isFunction(ga)) {
          ga(
            "set",
            "page",
            action.payload.location.pathname + action.payload.location.search
          );
          ga("send", "pageview");
        }

        break;
      case RECEIVE_AUDIO:
        const isPlaying = !!store.getState().audio.playing || !!action.playing;
        if (isPlaying && action.time) {
          // Audio has started playing, so start sending play time events.
          sendPlayTimeEvent(Math.round(1000 * action.time));
        }

        break;
    }

    return next(action);
  };
}
