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
  RandomMoment,
  Settings,
  PlaylistViewer,
  DJ,
  Apollo11Explorer
} from "./containers";

export default (
    <Route name="app" path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="settings" component={Settings} />
      <Route path="moments/moment/:momentId" component={MomentViewer} />
      <Route path="moments" component={Moments} />
      <Route path="stories/story/:storyId" component={StoryViewer} />
      <Route path="stories/story/:storyId/moment" component={PlaylistViewer}>
        <Route path=":momentId" component={MomentViewer} />
      </Route>
      <Route path="stories" component={Stories} />
      <Route path="stories/apollo11" component={Apollo11Explorer} />
      <Route path="stories/apollo11/:missionDay" component={Apollo11Explorer}/>
      <Route path="moments/random" component={RandomMoment} />
      <Route path="dj" component={DJ} />
      <Route path="*" component={NoMatch}/>
    </Route>
);
