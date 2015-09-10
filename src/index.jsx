import React, {Component} from "react";
import Router, {RouteHandler, Route, DefaultRoute} from "react-router";

export class App extends Component {
  render() {
    return (
      <div>
        <h1 ref="appRouteTitle">Apollo SPA</h1>
        <RouteHandler ref="appRouteHandler" />
      </div>
    );
  }
}

export class Dashboard extends Component {
  render() {
    return (
      <div ref="helloDiv">
        Hello!
      </div>
    );
  }
}

const routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
