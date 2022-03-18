import React, { Component } from "react";
//import missionaudiohover from "../../../static/FastFactsimgs/missionaudio-hover.png";  // Need to add
export class InstructionsComponent extends Component {
  render() {
    return (
        <div className="Navigating">
        <div className="col-sm-6">
          <h3>
            {" "}
            <br></br>
            <b> Navigating Explore Apollo</b>
            <br></br>
            <br></br>
          </h3>
          <h4>
            <b>Mission content: </b>
          </h4>
          Fast Facts and information about a given mission can be located under the Missions tab. {" "}
          <br></br>
          <br></br>
          <h4>
            <b>Navigating to Multichannel Audio: </b>
          </h4>
          In order to access multichannel audio, hover over the Missions tab and move your mouse over a mission you’d like to hear audio from. 
          A tab labeled “Mission Audio” should pop out. Click on the tab to be taken to the multi-channel audio selections. <br></br>
          
          <br></br>
          <div>
            <h4>
              <b> Using Multichannel Audio: </b>
            </h4>
            To use multichannel audio, navigate to the Mission Audio page of a mission of your choice.
             Once there, there should be multiple “tapes” to select from. 
             Each tape is a collection of audios from multiple sources during the mission, 
             with the date the audio occurred displayed along the tape description bar. Choose 1 tape. 
             Once the tape has been selected, several tabs will appear. These tabs represent the audio 
             channels of a given tape. Select up to 3 to listen to and click play random. 
             You will be taken to a random chunk of audio that can be played either simultaneously 
             by all channels or one at a time. To select a specific chunk of audio, select the 
             “Advanced options” box rather than play random.<br></br> 
          </div>
        </div>
      </div>
    );
  }
}
