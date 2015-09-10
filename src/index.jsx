import React, {Component} from "react";
import Router, {RouteHandler, Route, DefaultRoute} from "react-router";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Apollo SPA</h1>
        <RouteHandler/>
      </div>
    );
  }
}

class Dashboard extends Component {
  render() {
    return (
      <div>
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
