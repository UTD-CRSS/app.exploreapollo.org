import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import apollo6logo from "../../../static/FastFactsimgs/apollo6logo.png";

export class Apollo6Explorer extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />

        <h4 className="center">
          <div className="titleBanner">
            <b>Apollo 6 - Trans-Lunar Injection</b>
          </div>
        </h4>

        <div className="row fastfacts">
          <div className="col-sm-6">
            <h3>
              {" "}
              <br></br>
              <b> Fast Facts</b>
              <br></br>
              <br></br>
            </h3>
            <h4>
              <b>Information:</b>
            </h4>
            1. Unmanned space flight<br></br>
            2. This mission wanted to demonstrate structure and thermal
            integrity and compatibility of the launch vehicle and spacecraft.
            <br></br>
            3. This mission also wanted to confirm launch loads and dynamic
            characteristics.<br></br> 4. Lastly, another mission was to evaluate
            the performance of emergency detection systems in closed-loop
            configuration. <br></br> <br></br>
            <h4>
              <b> Significance: </b>
            </h4>
            This was the second A-type mission of the United States Apollo
            program. <br></br>
            <br></br>
          </div>
          <div className="col-sm-6">
            <img
              src={apollo6logo}
              className="center addpadding"
              width="auto"
              height="auto"
            />
          </div>
        </div>
        <h4 className="center">
          <div className="titleBanner">
            <b>
              <u>AUDIO LAUNCHING INTO ORBIT SOON!</u>
            </b>
          </div>
        </h4>
        <AppFooter />
      </div>
    );
  }
}
