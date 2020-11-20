import React from "react";
import "./index.scss";

export function LessonList() {
  return (
    <div className="app-container">
      <nav className="navbar navbar-inverse bg-black">
        <a className="lessonlinks " href="/lessons#k-2">
          Cadets (k-2)
        </a>
        <a className="lessonlinks" href="/lessons#3-5">
          Astronauts (3-5)
        </a>
        <a className="lessonlinks" href="/lessons#6-8">
          Spacecraft Pilots (6-8)
        </a>
        <a className="lessonlinks" href="/lessons#9-12">
          Commanders (9-12)
        </a>
      </nav>
      <span className="addpadding"></span>

      <h3 className="center feedbacktext">
        We would love more ideas and input on engaging lessons for everyone to
        learn
      </h3>
      <button className="btn-dark addpadding btn-lg bolder">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfVDLIPM5RjvHuZPaJ8LF3zyR7zBQzZrwXXwWJp7V_4a397sg/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font>Submit a Lesson Plan here!</font>
        </a>
      </button>
      <span className="addpadding"></span>
      <span className="addpadding"></span>

      <h3 id="k-2" className="gradeanchor round out responsive">
        Cadets K-2
      </h3>
      <button className="btn-info btn-lg flex-grow-1 addpadding bolder">
        <a
          href="https://drive.google.com/file/d/1-lfODu9I_ClBMptXIyTcItyai_ymXanf/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <font>History: Man on the Moon!</font>{" "}
        </a>
      </button>
      <button className="btn-primary btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>Tech: Coming Soon</font>{" "}
        </a>
      </button>
      <button className="btn-secondary btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>Activities: Coming Soon</font>{" "}
        </a>
      </button>

      <span className="addpadding"></span>
      <span className="addpadding"></span>

      <h3 id="3-5" className="gradeanchor round out">
        Astronauts 3-5
      </h3>
      <button className="btn-info btn-lg flex-grow-1 addpadding bolder">
        <a
          href="https://drive.google.com/file/d/179IAuqqypsIsOQkuc7H3CJou2RcfnhBg/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <font>History: Team work makes the dream work!</font>{" "}
        </a>
      </button>
      <button className="btn-primary btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>Tech: Coming Soon</font>{" "}
        </a>
      </button>
      <button className="btn-secondary btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>Activities: Coming Soon</font>{" "}
        </a>
      </button>
      <span className="addpadding"></span>
      <span className="addpadding"></span>

      <h3 id="6-8" className="gradeanchor round out">
        Spacecraft pilots 6-8
      </h3>
      <button className="btn-info btn-lg flex-grow-1 addpadding bolder">
        <a
          href=" https://drive.google.com/file/d/1RRJjdASEg_H3fVw0MsC3ENYgdhYLmtkX/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {""}
          <font>History: Lunar Landing! </font>{" "}
        </a>
      </button>
      <button className="btn-primary btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>Tech: Coming Soon</font>{" "}
        </a>
      </button>
      <button className="btn-secondary btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>Activities: Coming Soon</font>{" "}
        </a>
      </button>
      <span className="addpadding"></span>
      <span className="addpadding"></span>

      <h3 id="9-12" className="gradeanchor round out">
        Commanders 9-12
      </h3>
      <button className="btn-info btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>History: Coming soon</font>{" "}
        </a>
      </button>
      <button className="btn-primary btn-lg flex-grow-1 addpadding bolder">
        <a
          href="https://drive.google.com/file/d/1m4aWDdcCoWHfNRGFJ6vPId-HzG4L-zEF/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <font>Tech: Make your own Lunar Module!</font>{" "}
        </a>
      </button>
      <button className="btn-secondary btn-lg flex-grow-1 addpadding bolder">
        <a href="">
          {" "}
          <font>Activities: Coming Soon</font>{" "}
        </a>
      </button>
      <span className="addpadding"></span>
      <span className="addpadding"></span>
    </div>
  );
}
