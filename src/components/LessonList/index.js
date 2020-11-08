import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonPlans } from "../../containers";

export function LessonList() {
  return (
    <div className="app-container">
      <h3>
        Lesson plans are categorized as follows: <br></br>
        K-2, 3-5, 6-8, and 9-12
      </h3>

      <button className="SubmitLessonPlanbtn">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVDLIPM5RjvHuZPaJ8LF3zyR7zBQzZrwXXwWJp7V_4a397sg/viewform?usp=sf_link">
          {" "}
          <font color="#000000">
            {" "}
            <b>Submit a Lesson Plan here!</b>
          </font>{" "}
        </a>
      </button>

      <h4>
        <br></br>
        <b>K-2:</b>
        <br></br>History:
        <button className="k-2histbtn">
          <a href="https://drive.google.com/file/d/1-lfODu9I_ClBMptXIyTcItyai_ymXanf/view?usp=sharing">
            {" "}
            <font color="#000000">Man on the Moon!</font>{" "}
          </a>
        </button>   
      </h4>

      <h4>
        <br></br>
        <b>3-5:</b>
        <br></br>History:
        <button className="k-2histbtn">
          <a href="https://drive.google.com/file/d/179IAuqqypsIsOQkuc7H3CJou2RcfnhBg/view?usp=sharing">
            {" "}
            <font color="#000000">Teamwork Makes the Dream Work!</font>{" "}
          </a>
        </button>  
      </h4>
      <h4>
        <br></br>
        <b>6-8:</b>
        <br></br>History<br></br>Tech<br></br>Practical/Activities
      </h4>
      <h4>
        <br></br>
        <b>9-12:</b>
        <br></br>History<br></br>Tech<br></br>Practical/Activities
      </h4>
    </div>
  );
}
