import React, { Component } from "react";
import { LessonList } from "../../components";
import { AppFooter, AppHeader } from "../App";

export class LessonPlans extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <h1>
          <br></br>
          <u>
            <font size="7">Preparing to Launch:</font>
          </u>
          <br></br>
          <i>
            <font size="6">
              Learn about the Apollo Missions through our guided curriculum!
            </font>
          </i>
        </h1>
        <LessonList />
        <AppFooter />
      </div>
    );
  }
}
