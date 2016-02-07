import React, {Component} from "react";
import classNames from "classnames";
import Wavesurfer from "react-wavesurfer";
import styles from "./index.scss";

function wrapAudioPlayerElements(child) {
  const PlayButtonName = PlayButton.name;
  const WavesurferName = Wavesurfer.name;
  const height = '128px'
  const styles = {
    [PlayButtonName]: {
      position: 'absolute',
      width: height,
      height: height,
      padding: 5
    },
    [WavesurferName]: {
      marginLeft: height
    }
  };
  return <div style={styles[child.type.name]}>
    {child}
  </div>
}

export function AudioPlayer({children}) {
  const containerStyles = {
    position: 'relative'
  };
  return <div style={containerStyles}>
    {React.Children.map(children, wrapAudioPlayerElements)}
  </div>
}

export function PlayButton({isPlaying, play, pause}){
  const classes = classNames(
    "glyphicon",
    {"glyphicon-pause": isPlaying},
    {"glyphicon-play": !isPlaying}
  );
  const clickFunction = (isPlaying) ? pause : play;
  const buttonStyles = {
    width: "100%",
    height: "100%",
    color: "white",
    textAlign: "center",
    background: "rgb(11, 61, 145)",
    borderRadius: "50%",
  };
  const iconStyles = {
    fontSize: "4em"
  }
  return (
    <div style={buttonStyles}
         className="playButtonContainer"
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

export default class MomentPlayer extends Component {
  componentWillMount() {
    const {url, start, end} = this.props;
    const audio = new Audio(url);

    //update
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime * 1000 > (end - start)) {
        //end of moment
        audio.pause();
        return this.props.loadAudio({
          time: this.props.audio.currentTime,
          playing: false
        });
      }

      this.props.loadAudio({
        time: this.props.audio.currentTime
      });
    }, true);

    //initial
    this.props.loadAudio({
      audio,
      time: audio.currentTime,
      playing: false
    });
  }

  pauseAudio() {
    this.props.audio.pause();
    this.props.loadAudio({
      playing: false
    });
  }

  playAudio() {
    const {start, end, audio} = this.props;
    if (audio.currentTime * 1000 < (end - start)) {
      //this.props.audio.play();
      this.props.loadAudio({
        playing: true
      });
    }
  }

  progressBarClicked(e) {
    const {start, end} = this.props;
    e.persist();
    //X from left, to full width
    const seekPercent = (e.clientX - e.target.getBoundingClientRect().left) / e.target.getBoundingClientRect().width;
    const seekTime = ((end - start) / 1000) * seekPercent;
    this.props.audio.currentTime = seekTime;
  }

  getSliceWidth() {
    //const {missionLength, start, end} = this.props;
    return 100;//((end - start) / missionLength) * 100;
  }

  getSliceLeftOffset() {
    //const {missionLength, start} = this.props;
    return 0;//(start / missionLength) * 100;
  }

  getCurrentTimeLeftOffset() {
    const {start, end} = this.props;
    const time = this.props.time ? this.props.time / 1000 : 0;
    return ((time * 1000 / (end - start)) * 1e5);
  }

  render() {
    const {url, playing, time, loadAudio} = this.props;
    return (<div>
      <h1 className="text-center">
        Now Playing: {this.props.title}
      </h1>
      <AudioPlayer>
        <PlayButton
          isPlaying={this.props.playing}
          play={this.playAudio.bind(this)}
          pause={this.pauseAudio.bind(this)} />
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
