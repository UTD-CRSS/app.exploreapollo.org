import React from "react";

import {
  IndexRoute,
  Route
} from "react-router";

import {
  Dashboard,
  NoMatch,
  Moments,
  MomentViewer,
  Stories,
  StoryViewer,
  App,
  Settings
} from "./containers";

export default (
    <Route name="app" path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="settings" component={Settings} />
      <Route path="moments/moment/:id" component={MomentViewer} />
      <Route path="moments" component={Moments} />
      <Route path="stories/story/:id" component={StoryViewer} />
      <Route path="stories" component={Stories} />
      <Route path="*" component={NoMatch}/>
    </Route>
);
