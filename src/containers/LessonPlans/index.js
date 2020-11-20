import React, { Component } from "react";
import { LessonList } from "../../components";
import lessonsbanner from "../../../static/LessonPlansImgs/LessonPlansBanner.png";
import { AppHeader } from "../App";
//import { AppFooter } from "../App";

export class LessonPlans extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <img
          src={lessonsbanner}
          className="center round-out"
          width="90%"
          height= "auto"
          border-radius="50px"
        />
        <LessonList />
        <br />
        <div className="app-container"></div>
      </div>
    );
  }
}
