import React, { Component } from "react";
import { InstructionsComponent } from "../../components/InstructionsComponent";
import { AppFooter, AppHeader } from "../App";

export class Instructions extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <h1 className="center">
          <b>
            <u>Instructions for Navigating the Website</u>
          </b>
        </h1>
        <br></br>
        <div className="row">
          <div className="col-md-5">
            <InstructionsComponent />
          </div>
          <br></br>
          <div className="col-sm-1">
            
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
