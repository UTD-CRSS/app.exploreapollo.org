import React, {Component} from "react";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h2 className="text-center">
              Explore Apollo is the first curated resource for Apollo mission audio and research.
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h3>
              Missions
            </h3>
            <ul>
              <li>
                Apollo 11 <a href="/stories?mission=apollo11">Listen Now</a>
              </li>
              <li>
                More to come in the future
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
