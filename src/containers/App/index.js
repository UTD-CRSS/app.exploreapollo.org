import React, { Component } from "react";
import logo from "../../../static/ExploreApolloLogo.gif";
import { Dashboard } from "../Dashboard";

export class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-brand navbar-expand-xl navbar-inverse">
        <div className="container-fluid">
          <a href="/">
            <img src={logo} width="95%" height="95%" />
          </a>
          <div className="navitem">
            <button className="navbtn">Missions</button>
            <div className="dropdown-content">
              <a href="/apollo1">Apollo 1</a>
              <a href="/apollo4">Apollo 4</a>
              <a href="/apollo5">Apollo 5</a>
              <a href="/apollo6">Apollo 6</a>
              <a href="/apollo11">Apollo 11</a>
              <a href="/apollo13">Apollo 13</a>
            </div>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <a href="/moments/random">Surprise Me!</a>
            </button>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <a href="/lessons">Lesson Plans</a>
            </button>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <a href="/inthenews" className="inTheNews">
                In the News
              </a>
            </button>
          </div>

          <div className="navitem">
            <button className="navbtn">FSC</button>
            <div className="dropdown-content">
              <a
                href="https://exploreapollo-fearless-steps.herokuapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fearless Steps Challenge: Phase 1
              </a>
              <a
                href="https://fearless-steps.github.io/ChallengePhase2/Data.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Fearless Steps Challenge: Phase 2
              </a>
            </div>
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

          <div className="navitem">
            <button className="navbtn">&#9733;</button>
            <div className="dropdown-content">
              <a href="/game"> Asteroid Strike </a>
              <a href="/dj"> DJ</a>
            </div>
          </div>

          <div className="navitem">
            <button className="navbtn">
              <a href="/search"> &#x1F50D;</a>
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
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/apollo11">Apollo 11</a>
                </li>
                <li>
                  <a href="/moments/random">Surprise Me!</a>
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
                  <a href="/settings">Settings</a>
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

// Removed FloatingFeedbackButton because it is a bit spazzy and we aren't sure if we need it 

// export class FloatingFeedbackButton extends Component {
//   constructor() {
//     super();

//     this.state = { isVisible: true };
//   }
//   onCloseClicked() {
//     this.setState({ isVisible: false });
//   }
//   render() {
//     const style = {
//       display: this.state.isVisible ? "inline-block" : "none",
//       height: "35px", // fix text blurriness...
//       position: "fixed",
//       top: "50%",
//       right: "-49px",
//       zIndex: 9999,
//       WebkitTransform: "rotate(-90deg)",
//       msTransform: "rotate(-90deg)",
//       transform: "rotate(-90deg)",
//     };

//     return (
//       <div className="btn-group" style={style} role="group" aria-label="...">
//         <a
//           href="https://docs.google.com/forms/d/e/1FAIpQLSfyGpbRXC3J2r3yJp_eBeYVmukkHoqkEx4rsSsiIgUxIaaEKw/viewform?usp=sf_link"
//           target="_blank"
//           className="btn btn-primary"
//         >
//           Feedback
//         </a>
//         <button
//           type="button"
//           className="btn btn-danger"
//           onClick={this.onCloseClicked.bind(this)}
//         >
//           <span
//             className="glyphicon glyphicon-remove"
//             aria-hidden="true"
//           ></span>
//         </button>
//       </div>
//     );
//   }
// }

export class App extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <Dashboard />
        {/* <FloatingFeedbackButton /> */}
        <div className="app-panel">{this.props.children}</div>
        <AppFooter />
      </div>
    );
  }
}
