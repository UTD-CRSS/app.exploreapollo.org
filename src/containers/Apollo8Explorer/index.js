import React, { Component } from "react";
import _ from "lodash";
import { AppFooter, AppHeader } from "../App";
import ReactPlayer from "react-player" //used for temp audio display the professor wanted
import apollo8logo from "../../../static/FastFactsimgs/apollo8logo.png";  //Need to add
import Crew from "../../../static/FastFactsimgs/apollo8crew.jpg"; //Need to add
export class Apollo8Explorer extends Component {
  render() {
    const url = "/apollo8/";
    return (
      <div className="app-container"> 
        <AppHeader />
        <h4 className="center">
          <div className="titleBanner">
            <b>
              "Roger, please be informed there is a Santa Claus." -
              Jim Lovell, Apollo 8
            </b>
          </div>
        </h4>

        <div className="row fastfacts">
          <div className="col-sm-6">
            <h3>
              {" "}
              <br></br>
              <b> Fast Facts</b>
              <br></br>
              <br></br>
            </h3>
            <h4>
              <b>Information: </b>
            </h4>
            1. Astronauts: Frank F. Borman II, James A. Lovell Jr., and William A. Anders{" "}
            <br></br>
            2. This was the first successful manned mission to orbit the Moon and return to Earth.{" "}
            <br></br>
            3. The mission reached lunar orbit on christmas eve. <br></br>
            4. Apollo 8 took 3 days to reach the moon, with a total travel time of 7 days.{" "}
            <br></br>
            5. The flight had a period of 89 hours where Mission Control lost contact with Apollo 8. <br></br>
            6. Upon arriving back at Earth, the Apollo 8 crew experienced a "Splashdown", where they
            had to land their spacecraft in the ocean. <br></br> <br></br>
            <h4>
              <b>Significance: </b>
            </h4>
            1. Apollo 8 was the first mission to successfully orbit the moon and return. <br></br>
            2. The Apollo 8 crew were the first crew to observe and photograph an Earthrise." <br></br>{" "}
            <br></br>
            <div>
              <h4>
                <b> Crew: </b>
              </h4>
              Pictured Left to Right <br></br>
              1. James Lovell (Command Module Pilot)<br></br>
              2. William Anders (Lunar Module Pilot) <br></br>
              3. Frank Borman II (Commander) <br></br>
            </div>
          </div>

          <div className="col-sm-6">
            <img
              src={apollo8logo}
              className="center addpadding"
              width="70%"
              height="auto"
            />
            <img
              src={Crew}
              className="center addpadding"
              width="80%"
              height="auto"
            />
          </div>
        </div> 
        <h4 className="center">
          <div className="titleBanner">
            <b>
              <u>AUDIO LAUNCHING INTO ORBIT SOON!</u>
            </b>
          </div>
          <div>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=Wfd0oC3eFWw"
            />
          </div>
        </h4>
        <AppFooter />
      </div>
    );
  }
}
