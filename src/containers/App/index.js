import React, {Component} from "react";
import {Link} from "react-router";

export class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link ref="appRouteTitle" className="navbar-brand" to="/">
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
              <Link to="/moments">
                Moments
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
      <div>
        <AppHeader/>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

