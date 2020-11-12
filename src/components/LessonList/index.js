import React from "react";

export function LessonList() {
  return (
    <div className="app-container">
      <h5>
        These lesson plans will lead you to a Google Doc. Please feel free to download these files
        and use them in your classroom! <br></br> Don't forget to leave us feedback so that we can improve
        the quality of the lessons and bring you more of them! <br></br>
      </h5>

      <h4>
      <button className="SubmitLessonPlanbtn">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVDLIPM5RjvHuZPaJ8LF3zyR7zBQzZrwXXwWJp7V_4a397sg/viewform?usp=sf_link">
          {" "}
          <font color="#000000">
            {" "}
            <b>Submit a Lesson Plan here!</b>
          </font>{" "}
        </a>
      </button>
      </h4>

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
        <button className="3-5histbtn">
          <a href="https://drive.google.com/file/d/179IAuqqypsIsOQkuc7H3CJou2RcfnhBg/view?usp=sharing">
            {" "}
            <font color="#000000">Teamwork Makes the Dream Work!</font>{" "}
          </a>
        </button>  
      </h4>
      <h4>
        <br></br>
        <b>6-8:</b>
        <br></br>History:
        <button className="6-8histbtn">
          <a href="https://drive.google.com/file/d/1RRJjdASEg_H3fVw0MsC3ENYgdhYLmtkX/view?usp=sharing">
            {" "}
            <font color="#000000">Lunar Landing!</font>{" "}
          </a>
        </button> 
      </h4>
      <h4>
        <br></br>
        <b>9-12:</b>
        <br></br>History<br></br>Tech<br></br>Practical/Activities
      </h4>
    </div>
  );
}
