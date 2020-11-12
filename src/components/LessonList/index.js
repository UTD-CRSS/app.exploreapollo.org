import React from "react";

export function LessonList() {
  return (
    <div className="app-container">
      <h3 className = "center">We would love more ideas and input on engaging lessons for everyone to learn</h3>
      <button className="btn-primary btn-lg">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVDLIPM5RjvHuZPaJ8LF3zyR7zBQzZrwXXwWJp7V_4a397sg/viewform?usp=sf_link">
            <font>Submit a Lesson Plan here!</font>
        </a>
      </button>
      

      <h4 className ="center">
        <br></br>
        <b className="center">K-2:</b>
        <br></br>History: 
      </h4>
      <button className="btn-warning btn-lg round-out flex-grow-1">
          <a href="https://drive.google.com/file/d/1-lfODu9I_ClBMptXIyTcItyai_ymXanf/view?usp=sharing">
            {" "}
            <font>Man on the Moon!</font>{" "}
          </a>
        </button>  

      <h4 className ="center">
        <br></br>
        <b className="center">3-5:</b>
        <br></br>History:
      </h4>
      <button className="btn-info btn-lg round-out flex-grow-1">
          <a href="https://drive.google.com/file/d/179IAuqqypsIsOQkuc7H3CJou2RcfnhBg/view?usp=sharing">
            {" "}
            <font>Teamwork Makes the Dream Work!</font>{" "}
          </a>
        </button>  
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
