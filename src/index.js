import "./scss/main.scss";
import React from "react";
import ReactDom from "react-dom";
// import { render } from "react-dom";
import { Provider } from "react-redux";
//import { ReduxRouter } from "redux-router";
//import configureStore from "./store/configureStore";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import  Routes  from "./routes";

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
  Game
} from "./containers";

if (location.href.indexOf("#") != -1) {
  history.replaceState({} , "", `${location.hash.substring(1)}`);
}

//const store = configureStore();

ReactDom.render(
 // <Provider store={store}>
    <BrowserRouter>
      <Switch>
      {/* <Route name="app" path="/" component={App} />
        <Route path="settings" component={Settings} />
        <Route path="moments/moment/:momentId" component={MomentViewer} />
        <Route path="moments" component={Moments} />
        <Route path="stories/story/:storyId" component={StoryViewer} />
        <Route path="stories/story/:storyId/moment" component={PlaylistViewer}>
          <Route path=":momentId" component={MomentViewer} />
        </Route>
        <Route path="search" component={Search} />
        <Route path="stories" component={Stories}/>
        <Route path="apollo11" component={Apollo11Explorer}/>
        <Route path="apollo11/day/:missionDay" component={Apollo11Explorer}/>
        <Route path="moments/random" component={RandomMoment} />
        <Route path="dj" component={DJ} />
        <Route path="game" component={Game} />
        <Route path="*" component={NoMatch}/> */}
        <Routes />
      </Switch>
    </BrowserRouter>,
  //</Provider>
document.getElementById("houston"));
