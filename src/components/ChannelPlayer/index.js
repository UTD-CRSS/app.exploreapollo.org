import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  AudioPlayer,
  ChannelTimeline,
} from "../../components";

import getActiveIndex from "./getActiveIndex";
export class ChannelPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      audio: {time: 0, channelId: 0 },
      transcripts: [],
      audioUrl: "",
      title: "",
      timelineEnable: false,
      channel: "",
      playAll: this.props.playAll,
      pauseAll: this.props.pauseAll,
      focusOnActiveTranscript: true
    };
    this.timelineClickEvent = this.timelineClickEvent.bind(this);
  }

  handleFocusTranscriptEvent =()=>{
    var focusOnActiveTranscript = !this.state.focusOnActiveTranscript
    this.setState({focusOnActiveTranscript: focusOnActiveTranscript})
  }

  toggleTimeline=()=>{
      this.setState({timelineEnable: !this.state.timelineEnable});

  }

  timelineClickEvent(comp, startTime){
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
    if (comp == "player") {
      seekTime = startTime;
    } else {
      seekTime = (startTime - 0);
    }
    // if (momentMetStart) {
      if (this) {
        this.setState({
          audio: {
            playing: this.state.audio.playing,
            time: seekTime,
            channelId: this.state.audio.channelId,
          },
        });
      }
    // }
  };

  componentDidMount() {
    const data = this.state.data;
    if (data['channel']){
      const channelJson = data['channel'];
      const url = channelJson['audioUrl'];
      const title = channelJson['title'];
      const channel = channelJson['channel_name']
      const transcripts = data['transcripts']

      this.setState({
        loading: false,
        audio: { time: 0, channelId: this.props.data['channel'].id },
        transcripts: transcripts,
        audioUrl: url,
        title: title,
        channel: channel
      });
  }
  }

  componentDidUpdate() {

    const transcripts = this.state.transcripts
    // DOM for timeline
    // only need this when transcripts are displayed
    if (this.state.timelineEnable && this.state.focusOnActiveTranscript && transcripts){
      let parent = ReactDOM.findDOMNode(this).children[0].children[2].children[0];
      let timeline;
      let scrollHeight = 0;
      if (parent != undefined) {
        timeline =
          parent.children[0].children[0].children[0].children[0].children[1];
        transcripts.forEach((t) => (t.active = false));
        let activeIndex = getActiveIndex(
          transcripts,
          this.state.audio.time
        );
        if (activeIndex < 0) {
          activeIndex = 0;
        }
        for (var i = activeIndex - 2; i >= 0; i--) {
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

    if (this.state.playAll != this.props.playAll){
      this.setState({playAll: this.props.playAll})
    }

    if (this.state.pauseAll != this.props.pauseAll){
      this.setState({pauseAll: this.props.pauseAll})
    }
  }

  render() {
    const { onEnd, autoplay } = this.props;
    var timelineEnable = this.state.timelineEnable
    var focusOnTranscript = this.state.focusOnActiveTranscript

    let transcripts = this.state.transcripts;

    let { time } = this.state.audio;
    const currentAudioTime = time;
    var activeIndex
    if (transcripts){
      transcripts.forEach((t) => (t.active = false));
      activeIndex = getActiveIndex(transcripts, currentAudioTime);
    
      if (activeIndex >= 0) {
        transcripts[activeIndex].active = true;
      }
    }

    if (!this.state.channel){
      return(
      <h4>
        Error loading audio for this channel
      </h4>
      )
    }

    return (
      <div>
        <div className="moment-viewer-container">
          <AudioPlayer
            operation={this.state.title}
            url={this.state.audioUrl}
            time={this.state.audio.time}
            autoplay={autoplay}
            playAll={this.state.playAll}
            pauseAll={this.state.pauseAll}
            togglePausePlay={this.props.togglePausePlay}
            clickEvent={this.timelineClickEvent}
            channelName={this.state.channel}
          />
          <div className="mt-5 d-flex">
            <button type="button" className="btn btn-secondary mr-2" onClick={this.toggleTimeline}>
              {timelineEnable ? "Hide Transcript" : "Display Transcript"}
            </button>
            { timelineEnable &&
            <button type="button" className="btn btn-secondary" onClick={this.handleFocusTranscriptEvent}>
              {focusOnTranscript ? "Unfocus Active Transcript" : "Focus Active Transcript"}
            </button>
            }
          </div>
          {/* display transcript only if user click the display transcript button */}
          { this.state.timelineEnable &&
          <div style={{ marginTop: "0.5em" }} className="timeline-panel row">
            <ChannelTimeline
              speakerName={this.state.speakerName}
              timeline={transcripts}
              clickEvent={this.timelineClickEvent}
            />
          </div>
          }
        </div>
      </div>
    );
  }
}
