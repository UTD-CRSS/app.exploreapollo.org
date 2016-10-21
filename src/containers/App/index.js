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
        </div>
      </nav>
    );
  }
}

export class AppFooter extends Component {
  render() {
    return (
      <footer>
        <div className="background" />
        <div className="fade-to-black down" style={{position: "absolute", left: 0, top: 0, width: "100%", height: "50%"}} />

        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/stories?mission=apollo11">Apollo 11</Link></li>
                <li><a href="https://exploreapollo.org/">Project Homepage</a></li>
              </ul>
            </div>
            
            <div className="col-md-4 col-md-offset-1">
              <ul className="footer-links">
                <li><a href="https://exploreapollo.org/about/">About Us</a></li>
                <li><a href="https://github.com/UTD-CRSS">GitHub</a></li>
                <li><Link to="/settings">Settings</Link></li>
              </ul>
            </div>
          </div>

          <p className="footer-text">ExploreApollo.org uses signal, speech and language processing algorithms to extract new information, merge information sources, and provide a new perspective on the NASA Apollo missions.</p>
        </div>
      </footer>
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
        <AppFooter/>
      </div>
    );
  }
}

