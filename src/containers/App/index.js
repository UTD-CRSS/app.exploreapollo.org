import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "../Dashboard";

export class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-brand navbar-expand-xl navbar-inverse">
        <div className="container-fluid">
          <Link to="/" className="ExploreApollo">
            Explore Apollo
          </Link>
          <div className="navitem">
            <button className="navbtn">Missions</button>
            <div className="dropdown-content">
              <a href="/apollo11">Apollo 11</a>
              <a href="/apollo13">Apollo 13</a>
            </div>
          </div>

          <div className="navitem" img>
            <button className="navbtn">
              <Link to="/search">Search</Link>
            </button>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <Link to="/moments/random">Surprise Me!</Link>
            </button>
          </div>

          <div className="navitem">
            <button className="navbtn">
                Activities
            </button>
            <div className="dropdown-content">
              <a href="/game"> Game </a>
              <a href="/dj"> DJ</a>
            </div>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <Link to="/lessons">Lesson Plans</Link>
            </button>
            <div className="dropdown-content">
              <a href="/lessons/k-2">Cadets (K-2)</a>
              <a href="/lessons/3-5">Astronauts (3-5)</a>
              <a href="/lessons/6-8">Spacecraft Pilots (6-8)</a>
              <a href="/lessons/9-12">Commanders (9-12)</a>
            </div>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <Link to="/inthenews">In the News</Link>
            </button>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfyGpbRXC3J2r3yJp_eBeYVmukkHoqkEx4rsSsiIgUxIaaEKw/viewform?usp=sf_link"
                target="_blank"
              >
                Submit Feedback
              </a>
            </button>
          </div>
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
        <div
          className="fade-to-black down"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "50%",
          }}
        />

        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-2">
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/apollo11">Apollo 11</Link>
                </li>
                <li>
                  <Link to="/moments/random">Surprise Me!</Link>
                </li>
              </ul>
            </div>

            <div className="col-sm-4 col-sm-offset-1">
              <ul className="footer-links">
                <li>
                  <a href="https://exploreapollo.org/">Project Homepage</a>
                </li>
                <li>
                  <a href="https://github.com/UTD-CRSS">GitHub</a>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
              </ul>
            </div>
          </div>

          <p className="footer-text">
            ExploreApollo.org uses signal, speech and language processing
            algorithms to extract new information, merge information sources,
            and provide a new perspective on the NASA Apollo missions.
          </p>
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
    this.setState({ isVisible: false });
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
      transform: "rotate(-90deg)",
    };

    return (
      <div className="btn-group" style={style} role="group" aria-label="...">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSedsStMnIh9FFepJ-H_JMW8QOMr3LSUKBfpEIOEzi3p_trk1Q/viewform"
          target="_blank"
          className="btn btn-primary"
        >
          Feedback
        </a>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.onCloseClicked.bind(this)}
        >
          <span
            className="glyphicon glyphicon-remove"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    );
  }
}

export class App extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <div style={{ padding: "1em", background: "#375a7f", color: "white" }}>
          Now featuring:{" "}
          <a
            style={{ color: "white" }}
            href="https://exploreapollo-fearless-steps.herokuapp.com/"
          >
            the Fearless Steps Challenge
          </a>
        </div>
        <Dashboard />
        <FloatingFeedbackButton />
        <div className="app-panel">{this.props.children}</div>
        <AppFooter />
      </div>
    );
  }
}
