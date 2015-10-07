import React, {Component} from "react";
import {
  DefaultRoute,
  IndexRoute,
  Route,
  Router
} from "react-router";

import {
  Dashboard,
  NoMatch,
  App
} from './containers';

React.render((
  <Router>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body);
