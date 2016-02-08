import React, {Component} from "react";
import {Link} from "react-router";

export class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link testRef="appRouteTitle" className="navbar-brand" to="/">
              Explore Apollo
            </Link>
          </div>

          <ul className="nav navbar-nav">
            <li>
              <Link to="/stories">
                Stories
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/settings">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default class App extends Component {

  render() {
    return (
      <div id="app">
        <AppHeader/>
        <div className="app-panel">
          {this.props.children}
        </div>
      </div>
    );
  }
}

