import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import apollo1logo from "../../../static/apollo1logo.jpg";

export class Apollo1Explorer extends Component {
    render() {
      return (
        <div className="app-container">
          <AppHeader/>
  
          <h4 className="center">
            <b>"There was an unspoken promise on everyone's part to the three astronauts that their deaths would not be in vain." -Apollo 1</b>
          </h4>
  
          <div className="row fastfacts">
            <div className="col-sm-6">
              <h4>
                {" "}
                <br></br>
                <b> Fast Facts</b>
                <br></br>
              </h4>
              <p>
                <b>Information:</b> <br></br>
                1. This was a tragedy mission. <br></br> 
                2. Astronauts: Virgil Grissom, Edward White, and Roger Chaffee <br></br>
                3. The astronauts' lives were lost when a fire swept through the command module. <br></br>
                4. This tragedy postponed crewed launches until NASA officials cleared them for flight. <br></br>
                5. This mission was what decided that there would be no Apollo 2 or 3. <br></br>
               {" "}
                <br></br>
                <b> Significance: </b> <br></br>
                Due to the tragic mission, no mission was ever named Apollo 2 or 3. <br></br>
               <br></br>
              </p>
            </div>
            <div className="col-sm-6">
            <img
              src={apollo1logo}
              className="apollo1Logo"
              width="auto"
              height="auto"
            />
            </div>
          </div>
          <AppFooter/>
        </div>
      );
    }
  }
  