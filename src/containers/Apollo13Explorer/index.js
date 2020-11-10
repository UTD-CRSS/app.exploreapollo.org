import React, { Component } from "react";
import Apollo13logo from "../../../static/Apollo13logo.jpg";
import { AppFooter, AppHeader } from "../App";
import { Apollo13StoryTimeline } from "../../components";

export class Apollo13Explorer extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
      
        <h4 className="center"><b>"Houston, we've had a problem here."- Apollo 13</b></h4> 
     
        
        <div className="row">
        <div className="col-sm-6">
        <h4> <br></br><b>  Fast Facts</b><br></br></h4>
        <p>
          <b>Information:</b> <br></br> 
            1. Astronauts: Jim Lovell, Fred Haise, and Jack Swigert <br></br>
            2. The rocket that carried the astronauts is called the Saturn V. This rocket was the heaviest flown rocket by NASA. <br></br>
            3. The command module on the Odyssey was completely damaged, so they used the Aquarius lunar module to come back to Earth. (This is what they were supposed to use when they landed
              on the moon). <br></br>
            4. This became a very dangerous situation because Aquarius did not have a heat shield. <br></br>

            <b> Significance: </b> <br></br>
                1. This was the most carefully watched mission. <br></br>
                2. The mission was supposed to be the 3rd landing attempt on the moon. <br></br>
                3. The primary goal of this mission was to study Earth's origin. The plan was to land near the Fra Mauro crater. <br></br>
                4. The Fra Mauro crater had material from when the moon was first created. <br></br>
                5. This mission brought about a very famous quote: "Houston, we have a problem." <br></br> 
          
         </p>   
          </div>
          <div className="col-sm-6">
            <img
              src={Apollo13logo}
              className="Apollo13Logo"
              width="auto"
              height="auto"
            />
          </div>     
      </div>
        
        <Apollo13StoryTimeline />
        <AppFooter />
      </div>
    );
  }
}
