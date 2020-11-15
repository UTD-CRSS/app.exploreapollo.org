import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import apollo6logo from "../../../static/apollo6logo.jpg";

export class Apollo6Explorer extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />

        <h4 className="center">
          <b>Apollo 6</b>
        </h4>

        <div className="row fastfacts">
          <div className="col-sm-6">
            <h4>
              {" "}
              <br></br>
              <b> Fast Facts</b>
              <br></br>
            </h4>
            <p>
              <b>Information:</b> <br></br>
              1. Unmanned space flight<br></br>
              2. This mission wanted to demonstrate structure and thermal
              integrity and compatibility of the launch vehicle and spacecraft.
              <br></br>
              3. This mission also wanted to confirm launch loads and dynamic
              characteristics. 4. Lastly, another mission was to evaluate the
              performance of emergency detection systems in closed-loop
              configuration. <br></br>
              <b> Significance: </b> <br></br>
              This was the second A-type mission of the United States Apollo
              program. <br></br>
              <br></br>
            </p>
          </div>
          <div className="col-sm-6">
            <img
              src={apollo6logo}
              className="apollo6Logo"
              width="auto"
              height="auto"
            />
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
