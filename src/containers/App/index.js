import React, {Component} from "react";

export class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a ref="appRouteTitle" className="navbar-brand" href="#">
              Explore Apollo
            </a>
          </div>
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

