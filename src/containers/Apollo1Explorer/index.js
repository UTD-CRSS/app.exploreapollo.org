import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import apollo1logo from "../../../static/FastFactsimgs/apollo1logo.jpg";
import Crew from "../../../static/FastFactsimgs/apollo1crew.jpg";

export class Apollo1Explorer extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />

        <h4 className="center">
          <div className="titleBanner">
            <b>
              "There was an unspoken promise on everyone's part to the three
              astronauts that their deaths would not be in vain." - Apollo 1
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
              <b>Information:</b>
            </h4>
            1. This was a tragedy mission. <br></br>
            2. Astronauts: Virgil Grissom, Edward White, and Roger Chaffee{" "}
            <br></br>
            3. The astronauts' lives were lost when a fire swept through the
            command module. <br></br>
            4. This tragedy postponed crewed launches until NASA officials
            cleared them for flight. <br></br>
            5. This mission was what decided that there would be no Apollo 2 or
            3. <br></br> <br></br>
            <h4>
              <b> Significance: </b>
            </h4>
            Due to the tragic mission, no mission was ever named Apollo 2 or 3.{" "}
            <br></br>
            <br></br>
          </div>
          <div className="col-sm-6">
            <img
              src={apollo1logo}
              className="center addpadding"
              width="90%"
              height="auto"
            />
          </div>
        </div>
        <h4 className="center titleBanner round-out">
          <b> Crew: May their memory and story continue to live on </b>
          <br></br>Pictured Left to Right <br></br>
          1. Virgil "Gus" Grissom (Commander)<br></br>
          2. Edward White (Command Pilot) <br></br>
          3. Roger Chaffee (Pilot) <br></br>
          <br></br>
        </h4>
        <img
          src={Crew}
          className="center addpadding"
          width="70%"
          height="auto"
        />
        <h4 className="center">
          <div className="titleBanner">
            <b>
              <u>AUDIO LAUNCHING INTO ORBIT SOON!</u>
            </b>
          </div>
        </h4>
        <AppFooter />
      </div>
    );
  }
}
