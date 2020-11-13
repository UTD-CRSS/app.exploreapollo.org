import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";

export class Apollo5Explorer extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <h1>Apollo 5 </h1>
        <AppFooter />
      </div>
    );
  }
}