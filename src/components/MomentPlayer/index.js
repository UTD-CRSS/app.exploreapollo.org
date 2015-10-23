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
  componentWillMount() {
    const {url} = this.props;
    const audio = new Audio(url)
    audio.addEventListener("timeupdate", () => {
      this.setState({
        time: audio.currentTime
      });
    }, true);
    this.setState({
      audio,
      playing: false,
    });
  }

  pauseAudio() {
    this.state.audio.pause();
    this.setState({playing: false});
  }

  playAudio() {
    this.state.audio.play();
    this.setState({playing: true});
  }

  getSliceWidth() {
    const {missionLength, start, end} = this.props;
    return ((end - start) / missionLength) * 100;
  }

  getSliceLeftOffset() {
    const {missionLength, start} = this.props;
    return (start / missionLength) * 100;
  }

  getCurrentTimeLeftOffset() {
    const {missionLength, start} = this.props;
    const time = this.state.time ? this.state.time / 1000 : 0;
    return ((start + time) / missionLength) * 100;
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
            position: 'relative'
          }} className="progress">
          <div
            key={this.getCurrentTimeLeftOffset()}
            style={{
            position: 'absolute',
            left: `${this.getCurrentTimeLeftOffset()}%`,
            background: 'red',
            height: '100%',
            width: '2px'
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
