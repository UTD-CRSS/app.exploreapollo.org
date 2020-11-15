import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import apollo4logo from "../../../static/apollo4logo.jpg";

export class Apollo4Explorer extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />

        <h4 className="center">
          <div className="titleBanner">
            <b>Apollo 4</b>
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
            <p>
              <h4>
                <b>Information:</b>
              </h4>
              1. This marked the initial flight testing of S-IC and S-II stages.{" "}
              <br></br>
              2. This mission wanted to demonstrate structural and thermal
              integrity and compatibility of launch vehicle and spacecraft.{" "}
              <br></br>
              3. The mission wanted to verify operation of the command module
              heatshield. <br></br>
              4. The mission also wanted to evaluate performance of emergency
              detection system in an open-loop configuration. <br></br>
              5. It was launched from the Kennedy Space Center for the first
              time. <br></br> <br></br>
              <h4>
                <b> Significance: </b>
              </h4>
              This was the first unmanned flight to successfully carry the
              Apollo Command and Service Module into Earth's orbit. <br></br>
              <br></br>
            </p>
          </div>
          <div className="col-sm-6">
            <img
              src={apollo4logo}
              className="apollo4Logo"
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
