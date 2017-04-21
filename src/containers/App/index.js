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
              <Link to="/apollo11">
                Apollo 11
              </Link>
            </li>
            <li>
              <Link to="/search">
                Search
              </Link>
            </li>
            <li>
              <Link to="/moments/random">
                Surprise Me!
              </Link>
            </li>
            <li>
              <Link to="/about">
                About Us
              </Link>
            </li>
            <li>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSedsStMnIh9FFepJ-H_JMW8QOMr3LSUKBfpEIOEzi3p_trk1Q/viewform" target="_blank">
                Submit Feedback
              </a>
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
            <div className="col-sm-4 col-sm-offset-2">
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/apollo11">Apollo 11</Link></li>
                <li><Link to="/moments/random">Surprise Me!</Link></li>
              </ul>
            </div>

            <div className="col-sm-4 col-sm-offset-1">
              <ul className="footer-links">
                <li><a href="https://exploreapollo.org/">Project Homepage</a></li>
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

export class FloatingFeedbackButton extends Component {
  constructor() {
    super();

    this.state = { isVisible: true };
  }
  onCloseClicked() {
    this.setState({ isVisible: false});
  }
  render() {
    const style = {
      display: this.state.isVisible ? "inline-block" : "none",
      height: "35px", // fix text blurriness...
      position: "fixed",
      top: "50%",
      right: "-49px",
      zIndex: 9999,
      WebkitTransform: "rotate(-90deg)",
      msTransform: "rotate(-90deg)",
      transform: "rotate(-90deg)"
    };

    return (
      <div className="btn-group" style={style} role="group" aria-label="...">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSedsStMnIh9FFepJ-H_JMW8QOMr3LSUKBfpEIOEzi3p_trk1Q/viewform" target="_blank" className="btn btn-primary">Feedback</a>
        <button type="button" className="btn btn-danger" onClick={this.onCloseClicked.bind(this)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader/>
        <FloatingFeedbackButton/>
        <div className="app-panel">
          {this.props.children}
        </div>
        <AppFooter/>
      </div>
    );
  }
}
