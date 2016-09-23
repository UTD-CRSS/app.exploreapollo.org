// The constant isn't exported from redux-router so I'm having to redefine it.
// It's a bit of a hack and makes the Google Analytics code dependent on a version of redux-router.
// An alternative way to do this is subscribe to the react router, but then you can't handle events the same way.
const ROUTER_DID_CHANGE = '@@reduxReactRouter/routerDidChange';

export function googleAnalytics(store) {
  // Return a function handling actions.
  return next => action => {
    // Send a pageview when the route changes.
    if (action.type === ROUTER_DID_CHANGE) {
      ga('set', 'page', action.payload.location.pathname + action.payload.location.search);
      ga('send', 'pageview');
    }

    return next(action);
  };
}