// TODO: Fix double event on moment page load.

import { RECEIVE_AUDIO } from "./actions"; 

// The constant isn't exported from redux-router so I'm having to redefine it.
// It's a bit of a hack and makes the Google Analytics code dependent on a version of redux-router.
// An alternative way to do this is subscribe to the react router, but then you can't handle events the same way.
const ROUTER_DID_CHANGE = "@@reduxReactRouter/routerDidChange";

const gaMomentEventCategory = "Moment";
const gaPlayEventAction = "play";
const gaPauseEventAction = "pause";

export function googleAnalytics(store) {
  // Return a function handling actions.
  return next => action => {
    switch (action.type) {
      // Send a pageview when the route changes.
      case ROUTER_DID_CHANGE:
        ga("set", "page", action.payload.location.pathname + action.payload.location.search);
        ga("send", "pageview");
        break;
      
      // Send moment play/pause events.
      case RECEIVE_AUDIO:
        // This if statement is an optimization to avoid running code every time the app receives audio (often).
        if(typeof action.playing !== "undefined") {
          const state = store.getState();
          const gaEventAction = action.playing ? gaPlayEventAction : gaPauseEventAction;
          const timeInMilliseconds = Math.round(1000 * state.audio.time);

          ga("send", "event", gaMomentEventCategory, gaEventAction, state.audio.momentId, timeInMilliseconds);
        }
    }

    return next(action);
  };
}