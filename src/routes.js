import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import {
  NoMatch,
  Moments,
  MomentViewer,
  Stories,
  StoryViewer,
  App,
  RandomMoment,
  Settings,
  Search,
  DJ,
  Apollo1Explorer,
  Apollo4Explorer,
  Apollo5Explorer,
  Apollo6Explorer,
  Apollo8Explorer,
  Apollo11Explorer,
  Apollo13Explorer,
  Game,
  LessonPlans,
  Instructions,
  InTheNews,
  LoadingMoment,
  ChannelViewer,
  Channels,
  ChannelsLoader,
  ExternalReferences
} from "./containers";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/apollo1" component={Apollo1Explorer} />
        <Route exact path="/apollo4" component={Apollo4Explorer} />
        <Route exact path="/apollo5" component={Apollo5Explorer} />
        <Route exact path="/apollo6" component={Apollo6Explorer} />
        <Route path="/apollo8" component={Apollo8Explorer} />
        <Route exact path="/apollo13" component={Apollo13Explorer} />
        <Route exact path="/apollo11" component={Apollo11Explorer} />
        <Route name="app" exact path="/" component={App}></Route>
        <Route path="/settings" component={Settings} />
        <Route path="/moments/moment/:momentId" component={MomentViewer} />
        <Route exact path="/moments" component={Moments} />
        <Route exact path="/stories/story/:storyId" component={StoryViewer} />
        <Route
          exact
          path="/stories/story/:storyId/moment/:momentId"
          component={MomentViewer}
        />
        <Route
          exact
          path="/stories/story/:storyId/loading/:momentId"
          component={LoadingMoment}
        />

        <Route path="/search" component={Search} />
        <Route path="/stories" component={Stories} />
        <Route path="/apollo11/day/:missionDay" component={Apollo11Explorer} />
        <Route path="/moments/random" component={RandomMoment} />

        <Route exact path="/channels/:mission" component={Channels} />

        <Route path="/channels/load/:mission" component={ChannelsLoader} />

        <Route path="/channels/play/:mission" component={ChannelViewer} />

        <Route path="/dj" component={DJ} />
        <Route path="/game" component={Game} />
        <Route path="/lessons" component={LessonPlans} />
        <Route path="/inthenews" component={InTheNews} />
        <Route path="/externalreferences" component={ExternalReferences} />
        <Route path="/instructions" component={Instructions} />
        <Route path="*" component={NoMatch} />
      </Switch>
    );
  }
}
