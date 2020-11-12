import React, { Component } from "react";
import { LessonList } from "../../components";
import lessonsbanner from "../../../static/LessonPlansImgs/LessonPlansBanner.png";
import { AppFooter, AppHeader } from "../App";

export class LessonPlans extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <img
              src={lessonsbanner}
              className="center round-out"
              width="90%"
              height="80%"
              border-radius = "50px"
            />
        <LessonList />
        <br/>
        
      </div>
      
    );
  }
}
