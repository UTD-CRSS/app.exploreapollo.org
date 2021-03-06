import React, { Component } from "react";
import newslogo from "../../../static/newslogo.png";
import { InTheNewsComponent } from "../../components/InTheNewsComponent";
import { AppFooter, AppHeader } from "../App";

export class InTheNews extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <h1 className="center">
          <b>
            <u>Fearless Steps: In the NEWS!</u>
          </b>
        </h1>
        <br></br>
        <div className="row">
          <div className="col-md-5">
            <InTheNewsComponent />
          </div>
          <br></br>
          <div className="col-sm-1">
            <img
              src={newslogo}
              className="newslogo"
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
