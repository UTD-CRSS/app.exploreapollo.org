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
            <li>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSedsStMnIh9FFepJ-H_JMW8QOMr3LSUKBfpEIOEzi3p_trk1Q/viewform" target="_blank">
                Submit Feedback
              </a>
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
      <div className="app-container">
        <AppHeader/>
        <div className="app-panel">
          {this.props.children}
        </div>
      </div>
    );
  }
}

