import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import apollo5logo from "../../../static/apollo5logo.jpg";

export class Apollo5Explorer extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />

        <h4 className="center">
          <div className="titleBanner">
            <b>Apollo 5 - Unmanned Space Flight</b>
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
              1. Unmanned space flight<br></br>
              2. This mission wanted to verify the operation of Lunar Module
              ascent and descent propulsion systems.<br></br>
              3. This mission also wanted to evaluate Lunar Module staging and
              evaluate S-IVB instrument unit performance. <br></br>
              4. All mission objectives were achieved. <br></br> <br></br>
              <h4>
                <b> Significance: </b>
              </h4>
              This was the first unmanned flight of the Apollo Lunar Module,
              which would later carry astronauts to the luanr surface. <br></br>
              <br></br>
            </p>
          </div>
          <div className="col-sm-6">
            <img
              src={apollo5logo}
              className="apollo5Logo"
              width="auto"
              height="auto"
            />
          </div>

          <h4 className="center">
            <div className="titleBanner">
              <b>
                <u>AUDIO LAUNCHING INTO ORBIT SOON!</u>
              </b>
            </div>
          </h4>
        </div>
        <AppFooter />
      </div>
    );
  }
}
