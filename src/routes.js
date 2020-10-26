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
  PlaylistViewer,
  Search,
  DJ,
  Apollo11Explorer,
  Apollo13Explorer,
  Game,
  LessonPlans
} from "./containers";

export default class Routes extends Component {
  render() {
    return (
    <Switch>
      <Route name="app" exact path="/" component={App} ></Route>
        <Route path="/settings" component={Settings} />
        <Route path="/moments/moment/:momentId" component={MomentViewer} />
        <Route path="/moments" component={Moments} />
        <Route exact path="/stories/story/:storyId" component={StoryViewer} />
        <Route path="/stories/story/:storyId/moment" component={PlaylistViewer}>
          <Route path="/:momentId" component={MomentViewer} />
        </Route>
        <Route path="/search" component={Search} />
        <Route path="/stories" component={Stories}/>
        <Route path="/apollo11" component={Apollo11Explorer}/>
        <Route path="/apollo11/day/:missionDay" component={Apollo11Explorer}/>
        <Route path="/apollo13" component={Apollo13Explorer}/>
        <Route path="/moments/random" component={RandomMoment} />
        <Route path="/dj" component={DJ} />
        <Route path="/game" component={Game} />
        <Route path="/lessons" component={LessonPlans} />
        <Route path="*" component={NoMatch}/>
      </Switch>
  )
}
}
