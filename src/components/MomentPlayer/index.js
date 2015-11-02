import React, {Component} from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import {
  loadAudio
} from "../../actions";

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
  componentWillMount() {
    const {url, start, end} = this.props;
    const audio = new Audio(url);
    
    //update
    audio.addEventListener("timeupdate", () => {
      //end of moment
      let isPlaying = true;
      if (audio.currentTime * 1000 > (end - start)) {
        audio.pause();
        isPlaying = false;
      }
      this.props.loadAudio({
        audio,
        time: this.state.audio.currentTime,
        playing: isPlaying
      });
      this.setState({time: audio.currentTime, playing: isPlaying});
    }, true);

    //initial
    this.props.loadAudio({
      audio,
      time: audio.currentTime,
      playing: false
    });
    this.setState({time: audio.currentTime, audio});
  }

  pauseAudio() {
    this.state.audio.pause();
    this.setState({playing: false});
    this.props.loadAudio({
      audio: this.state.audio,
      time: this.state.audio.currentTime,
      playing: false
    });
  }

  playAudio() {
    this.state.audio.play();
    this.setState({playing: true});
    this.props.loadAudio({
      playing: true,
      audio: this.state.audio,
      time: this.state.audio.currentTime
    });
  }

  progressBarClicked(e) {
    const {start, end} = this.props;
    e.persist();
    //X from left, to full width
    const seekPercent = (e.clientX - e.target.getBoundingClientRect().left) / e.target.getBoundingClientRect().width;
    const seekTime = ((end - start) / 1000) * seekPercent;
    this.state.audio.currentTime = seekTime;  
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
    const time = this.state.time ? this.state.time / 1000 : 0;
    return ((time * 1000 / (end - start)) * 1e5);
  }

  render() {
    return (
      <div>
        <h4 className="text-center">
          Now Playing: {this.props.title} {this.state.time}
        </h4>
        <div className="text-center">
          <PlayButton
            isPlaying={this.state.playing}
            play={this.playAudio.bind(this)}
            pause={this.pauseAudio.bind(this)} />
          <div style={{
            position: "relative",
            cursor: "pointer"
          }}
          onClick={this.progressBarClicked.bind(this)}
          className="progress">
            <div
              key={this.getCurrentTimeLeftOffset()}
              className="slideTransition"
              style={{
                position: "absolute",
                left: `${this.getCurrentTimeLeftOffset()}%`,
                background: "red",
                height: "100%",
                width: "4px"
              }} />
            <div
              className="progress-bar"
              style={{
                marginLeft: `${this.getSliceLeftOffset()}%`,
                width: `${this.getSliceWidth()}%`
              }}
              role="progressbar" />
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const { audio } = state.audio;
  const { loading } = state.moments;
  if (loading) {
    return {
      loading
    };
  }
  return {
    currentAudio: audio
  };
}

export default connect(mapStateToProps, {
  loadAudio
})(MomentPlayer);