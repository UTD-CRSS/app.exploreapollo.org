import React, { Component } from "react";
import ReactDOM from "react-dom";

import { AudioPlayer, ChannelTimeline } from "../../components";

import getActiveIndex from "./getActiveIndex";
export class ChannelPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      audio: { time: 0, channelId: 0 },
      transcripts: [],
      audioUrl: "",
      title: "",
      operation: "",
      timelineEnable: false,
      channel: "",
      masterPlaybackTime: 0,
      playAll: this.props.playAll,
      pauseAll: this.props.pauseAll,
      focusOnActiveTranscript: true,
      scrollHeight: 0,
    };
    this.timelineClickEvent = this.timelineClickEvent.bind(this);
  }

  handleFocusTranscriptEvent = () => {
    var focusOnActiveTranscript = !this.state.focusOnActiveTranscript;
    this.setState({ focusOnActiveTranscript: focusOnActiveTranscript });
  };

  toggleTimeline = () => {
    this.setState({ timelineEnable: !this.state.timelineEnable });
  };

  timelineClickEvent(startTime) {
    //tolerance is to prevent number comparisons from being incorrect due to the very last decimal
    //because if the startTime and this.state.audio.time are not "equal" then the code will
    //create an infinite loop which will crash the momentViewer. We only experienced this issue on
    //moment 5 for some reason, and adding a tolerance was the simplest way to fix it after
    //attempting other debugging
    let tolerance = 0.00000001;
    if (Math.abs(startTime - this.state.audio.time) < tolerance) {
      return;
    }
    let seekTime;
    if (this.props.masterPlaybackTime !== this.state.masterPlaybackTime) {
      this.setState({ masterPlaybackTime: this.props.masterPlaybackTime });
      if (this.props.masterChannelName === this.state.channel.channelName) {
        seekTime = startTime;
      } else {
        seekTime = this.props.masterPlaybackTime;
      }
    } else {
      seekTime = startTime;
    }
    if (this) {
      this.setState({
        audio: {
          playing: this.state.audio.playing,
          time: seekTime,
          channelId: this.state.audio.channelId,
        },
      });
    }
  }

  componentDidMount() {
    const data = this.state.data;
    if (data && data["channel"]) {
      const channel = data["channel"];
      const url = channel["audioUrl"];
      const channelName = channel["channelName"];
      const transcripts = data["transcripts"];
      const operation = channel["operation"];
      const title = channel["channelTitle"];
      this.setState({
        loading: false,
        audio: { time: 0, channelId: this.props.data["channel"].id },
        transcripts: transcripts,
        audioUrl: url,
        channel: channelName,
        operation: operation,
        title: title,
      });
    }
  }

  componentDidUpdate() {
    const transcripts = this.state.transcripts;
    // DOM for timeline
    // only need this when transcripts are displayed
    if (
      this.state.timelineEnable &&
      this.state.focusOnActiveTranscript &&
      transcripts
    ) {
      let parent = ReactDOM.findDOMNode(this).children[0].children[2]
        .children[0];
      let timeline;
      let scrollHeight = 0;
      if (parent != undefined) {
        timeline =
          parent.children[0].children[0].children[0].children[0].children[1];
        transcripts.forEach((t) => (t.active = false));
        let activeIndex = getActiveIndex(transcripts, this.state.audio.time);
        for (var i = activeIndex[0] - 2; i >= 0; i--) {
          var activeItem = timeline.children[i];
          if (activeItem != undefined) {
            scrollHeight += timeline.children[i].offsetHeight - 1;
          }
        }
        if (timeline != undefined) {
          timeline.scrollTop = scrollHeight;
        }
      }
    }

    if (this.state.playAll != this.props.playAll) {
      this.setState({ playAll: this.props.playAll });
    }

    if (this.state.pauseAll != this.props.pauseAll) {
      this.setState({ pauseAll: this.props.pauseAll });
    }
  }

  render() {
    const { autoplay } = this.props;
    var timelineEnable = this.state.timelineEnable;
    var focusOnTranscript = this.state.focusOnActiveTranscript;

    let transcripts = this.state.transcripts;

    let { time } = this.state.audio;
    const currentAudioTime = time;
    var activeIndex;
    if (transcripts && timelineEnable) {
      transcripts.forEach((t) => (t.active = false));
      activeIndex = getActiveIndex(transcripts, currentAudioTime);
      if (activeIndex[1]) {
        transcripts[activeIndex[0]].active = true;
      }
    }

    if (!this.state.channel) {
      return <h4>Error loading audio for this channel</h4>;
    }

    return (
      <div>
        <div className="moment-viewer-container">
          <AudioPlayer
            operation={this.state.operation}
            url={this.state.audioUrl}
            time={this.state.audio.time}
            autoplay={autoplay}
            playAll={this.state.playAll}
            pauseAll={this.state.pauseAll}
            togglePausePlay={this.props.togglePausePlay}
            clickEvent={this.timelineClickEvent}
            channelName={this.state.channel}
            title={this.state.title}
            masterPlaybackTime={this.props.masterPlaybackTime}
            masterChannelName={this.props.masterChannelName}
            onSyncPlaybackTime={this.props.onSyncPlaybackTime}
          />
          <div className="mt-5 ml-3 d-flex">
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={this.toggleTimeline}
            >
              {timelineEnable ? "Hide Transcript" : "Display Transcript"}
            </button>
            {timelineEnable && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleFocusTranscriptEvent}
              >
                {focusOnTranscript
                  ? "Unfocus Active Transcript"
                  : "Focus Active Transcript"}
              </button>
            )}
          </div>
          {/* display transcript only if user click the display transcript button */}
          {this.state.timelineEnable && (
            <div style={{ marginTop: "0.5em" }} className="timeline-panel row">
              <ChannelTimeline
                timeline={transcripts}
                clickEvent={this.timelineClickEvent}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
