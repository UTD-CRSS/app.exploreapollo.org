/*global ga*/

import { RECEIVE_AUDIO } from "./actions"; 

// Tracks page-views and audio play times.
export function googleAnalytics(store) {
  // This constant isn't exported from redux-router so I'm having to redefine it.
  // It's a bit of a hack and makes the Google Analytics code dependent on redux-router's internal implementation.
  // An alternative way to do this is subscribe to the react router using browserHistory,
  // but I had some issues with store.browswerHistory being null in the action handler...
  const ROUTER_DID_CHANGE = "@@reduxReactRouter/routerDidChange";

  const gaMomentEventCategory = "Moment";
  const gaPlayTimeEventAction = "playTime";
  const gaPlayTimeEventIntervalInMilliseconds = 5000;

  // Sends events to Google Analytics periodically to track audio play time.
  let playTimeEventInterval = null;

  // Tracks play time when audio is stopped, which clears playTimeEventInterval.
  let playTimeEventIntervalStartTimeInMilliseconds = null;

  // Some helper functions.
  function sendPlayTimeEvent(playTimeInMilliseconds) {
    ga("send", "event", gaMomentEventCategory, gaPlayTimeEventAction, store.getState().audio.momentId, playTimeInMilliseconds);
  }
  function startSendingPlayTimeEvents() {
    if(!playTimeEventInterval) {
      playTimeEventIntervalStartTimeInMilliseconds = (new Date()).getTime();

      playTimeEventInterval = setInterval(() => {
        sendPlayTimeEvent(gaPlayTimeEventIntervalInMilliseconds);
        playTimeEventIntervalStartTimeInMilliseconds = (new Date()).getTime();
      }, gaPlayTimeEventIntervalInMilliseconds);
    }
  }
  function stopSendingPlayTimeEvents() {
    if(playTimeEventInterval) {
      clearInterval(playTimeEventInterval);

      // Track the time-played since the most recent interval 
      const timeInMilliseconds = (new Date()).getTime();
      sendPlayTimeEvent(timeInMilliseconds - playTimeEventIntervalStartTimeInMilliseconds);

      playTimeEventInterval = null;
      playTimeEventIntervalStartTimeInMilliseconds = null;
    }
  }

  // Return a function handling actions.
  return next => action => {
    switch (action.type) {
      case ROUTER_DID_CHANGE:
        // Audio has stopped, so stop sending play time events.
        stopSendingPlayTimeEvents();

        // Send a page-view.
        ga("set", "page", action.payload.location.pathname + action.payload.location.search);
        ga("send", "pageview");

        break;
      case RECEIVE_AUDIO:
        if(action.playing) {
          // Audio has started playing, so start sending play time events.
          startSendingPlayTimeEvents();
        } else if(action.playing === false) {
          // Audio has stopped playing, so stop sending play time events.
          stopSendingPlayTimeEvents();
        }

        break;
    }

    return next(action);
  };
}