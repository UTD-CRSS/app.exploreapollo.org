import React, {Component} from "react";
import classNames from "classnames";
import Wavesurfer from "react-wavesurfer";
import "./index.scss";

function wrapAudioPlayerElements(child) {
  const PlayButtonName = PlayButton.name;
  const WavesurferName = Wavesurfer.name;
  const height = "128px";
  const styles = {
    [PlayButtonName]: {
      position: "absolute",
      width: height,
      height: height,
      padding: 5
    },
    [WavesurferName]: {
      marginLeft: height
    }
  };
  return (<div style={styles[child.type.name]}>
    {child}
  </div>);
}

export function AudioPlayer({children}) {
  const containerStyles = {
    position: "relative"
  };
  return (<div style={containerStyles}>
    {React.Children.map(children, wrapAudioPlayerElements)}
  </div>);
}

export function PlayButton({isPlaying, play, pause}){
  const classes = classNames(
    "glyphicon",
    {"glyphicon-pause": isPlaying},
    {"glyphicon-play": !isPlaying}
  );
  const clickFunction = (isPlaying) ? pause : play;
  const iconStyles = {
    fontSize: "4em"
  };
  return (
    <div className="playButtonContainer"
         onClick={clickFunction}>
      <i testRef="playIcon"
         style={iconStyles}
         className={classes} />
    </div>
  );
}

function onPositionChange(loadAudio, e) {
  const currentTime = e.originalArgs[0];
  loadAudio({
    time: currentTime
  });
}

function setPlaying(loadAudio, playing) {
  loadAudio({
    playing
  });
}

export default class MomentPlayer extends Component {

  render() {
    const {url, playing, time, loadAudio} = this.props;
    return (<div>
      <h1 className="text-center">
        Now Playing: {this.props.title}
      </h1>
      <AudioPlayer>
        <PlayButton
          isPlaying={this.props.playing}
          play={setPlaying.bind(this, loadAudio, true)}
          pause={setPlaying.bind(this, loadAudio, false)} />
        <Wavesurfer
          audioFile={url}
          pos={time}
          onPosChange={onPositionChange.bind(this, loadAudio)}
          playing={playing}
        />
      </AudioPlayer>
    </div>);
  }
}
