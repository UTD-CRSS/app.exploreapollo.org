import React, { Component } from "react";
import Wavesurfer from "react-wavesurfer";
import "./index.scss";
import mediaplay from "../../../node_modules/open-iconic/png/media-play-8x.png";
import mediapause from "../../../node_modules/open-iconic/png/media-pause-8x.png";

export function wrapAudioPlayerElements(child) {
  const PlayButtonName = PlayButton.name;
  const WavesurferName = Wavesurfer.name;
  const height = "128px";
  const styles = {
    [PlayButtonName]: {
      position: "absolute",
      width: height,
      height: height,
      padding: 5,
    },
    [WavesurferName]: {
      marginLeft: height,
    },
  };
  return <div style={styles[child.type.name]}>{child}</div>;
}

export function AudioPlayer({ children }) {
  const containerStyles = {
    position: "relative",
  };
  return (
    <div style={containerStyles}>
      {React.Children.map(children, wrapAudioPlayerElements)}
    </div>
  );
}

export function PlayButton({ isPlaying, play, pause }) {
  const clickFunction = isPlaying ? pause : play;
  return (
    <div
      style={{ color: "#000" }}
      className="playButtonContainer"
      onClick={clickFunction}
    >
      {!isPlaying ? (
        <img src={mediaplay} className="play"></img>
      ) : (
        <img src={mediapause} className="pause"></img>
      )}
    </div>
  );
}

export class MomentPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { playing: this.props.playing, time: this.props.time, clickEvent: this.props.clickEvent };
  }

  playaudio() {
    this.setState({ playing: true });
  }

  pauseaudio() {
    this.setState({ playing: false });
  }

  seek(e) {
    const seekTime = e.originalArgs[0];
    this.state.clickEvent("player",seekTime);
  }

  render() {
    const {
      url,
      time,
      onEnd,
      autoplay,
      title,
      titleEl,
      volume,
    } = this.props;

    const { playing } = this.state;

    const surferOptions = {
      normalize: true,
    };

    return (
      <div className="moment-player-panel">
        {titleEl ? (
          titleEl(title)
        ) : (
          <h1 className="text-center">Now Playing: {title}</h1>
        )}
        <AudioPlayer>
          <PlayButton
            isPlaying={playing}
            play={this.playaudio.bind(this)}
            pause={this.pauseaudio.bind(this)}
          />
          <Wavesurfer
            audioFile={url}
            volume={volume}
            pos={time}
            onPosChange={this.seek.bind(this)}
            playing={playing}
            options={surferOptions}
            onFinish={onEnd}
            onReady={function () {
              if (autoplay) {
                this.playaudio.bind(this);
              }
            }}
          />
        </AudioPlayer>
      </div>
    );
  }
}
