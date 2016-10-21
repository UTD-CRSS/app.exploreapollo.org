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
      <footer style={{position: "relative", padding: "80px 0 20px 0"}}>
        <div style={{background: "url('http://weknowyourdreams.com/images/stars/stars-07.jpg')", opacity: 0.3, position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: -1}} />

        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <ul style={{listStyleType: "none", padding: 0}}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/stories?mission=apollo11">Apollo 11</Link></li>
                <li><a href="https://exploreapollo.org/">Project Homepage</a></li>
              </ul>
            </div>
            
            <div className="col-md-4 col-md-offset-1">
              <ul style={{listStyleType: "none", padding: 0}}>
                <li><a href="https://exploreapollo.org/about/">About Us</a></li>
                <li><a href="https://github.com/UTD-CRSS">GitHub</a></li>
                <li><Link to="/settings">Settings</Link></li>
              </ul>
            </div>
            
            <p style={{textAlign: "center"}}>ExploreApollo.org uses signal, speech and language processing algorithms to extract new information, merge information sources, and provide a new perspective on the NASA Apollo missions.</p>
          </div>
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

