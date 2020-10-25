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
  Search,
  DJ,
  Apollo11Explorer,
  Game,
  InTheNews
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
      <Route path="inthenews" component={InTheNews}/>
      <Route path="search" component={Search} />
      <Route path="stories" component={Stories}/>
      <Route path="apollo11" component={Apollo11Explorer}/>
      <Route path="apollo11/day/:missionDay" component={Apollo11Explorer}/>
      <Route path="moments/random" component={RandomMoment} />
      <Route path="dj" component={DJ} />
      <Route path="game" component={Game} />
      <Route path="*" component={NoMatch}/>
    </Route>
);
