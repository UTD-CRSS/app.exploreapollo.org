import React, {Component} from "react";
import classNames from "classnames";

export class PlayButton extends Component {
  render() {
    const {isPlaying, play, pause} = this.props;
    let classes = classNames("glyphicon", "icon-large", {"glyphicon-pause": isPlaying}, {"glyphicon-play": !isPlaying});
    let clickFunction = (isPlaying)? pause : play;
    return (
      <div>
        <i 
          className={classes}
          onClick={clickFunction}>
        </i>
      </div>
    );
  }
}

export default class MomentPlayer extends Component {
	render() {
  //this is probably the wrong way to do this?
  let audio = new Audio("https://aqueous-garden-9236.herokuapp.com/stream.mp3");
  let playing = false;
  var playAudio = function() {
    playing = true;
    audio.play();
  };
  var pauseAudio = function() {
    playing = false;
    audio.play();
  };
  return (
    <div>
      <h4 className="text-center">
        Now Playing: [ moment title ]
      </h4>
      <div className="text-center">
        <PlayButton
          isPlaying={playing} 
          play={playAudio}
          pause={pauseAudio} />
      </div>
    </div>
  );}
}