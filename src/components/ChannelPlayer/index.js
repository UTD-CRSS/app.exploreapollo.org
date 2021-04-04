import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spinner from "react-spinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import config from "../../../config";
import { fromJS } from "immutable";

import {
  AudioPlayer,
  ChannelTimeline,
  Timeline
} from "../../components";

import getActiveIndex from "./getActiveIndex";

export class ChannelPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.data,
      data: this.props.data,
      audio: { playing: false, time: 0, momentId: 0 },
      media: [],
      transcript: [],
      metric: [],
      metStart: 0,
      metEnd: 0,
      audioUrl: "",
      title: "",
      currentMission: null,
      story: null,
      storyId: 0,
      storyMomentList: [],
      timelineEnable: true

    };
    this.timelineClickEvent = this.timelineClickEvent.bind(this);
  }

  toggleTimeline(){
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
    let momentMetStart = this.state.metStart;
    let seekTime;
    if (comp == "player") {
      seekTime = startTime;
    } else {
      seekTime = (startTime - momentMetStart) / 1000;
    }
    if (momentMetStart) {
      if (this) {
        this.setState({
          audio: {
            playing: this.state.audio.playing,
            time: seekTime,
            momentId: this.state.audio.momentId,
          },
        });
      }
    }
  };

  componentDidMount() {
    // let loading = this.props.loading;

    // const moments = await fetch(`${config.apiEntry}/api/moments/${momentId}`);
    // if (!loading)
    let data = this.state.data;
    const momentJson = data.moment;
    const momentMedia = fromJS(momentJson.media);
    const startmet = fromJS(momentJson.metStart);
    const endmet = fromJS(momentJson.metEnd);
    const url = fromJS(momentJson.audioUrl);
    const t = fromJS(momentJson.title);
    const mission = fromJS(momentJson.mission);

    // const transcripts = await fetch(
    //   `${config.apiEntry}/api/moments/${momentId}/transcripts`
    // ).catch(err => console.log("Oh no: " + err));
    const transcriptJson = data.transcript;

    this.setState({
      loading: false,
      audio: { playing: false, time: 0, momentId: this.props.data['moment'].id },
      media: momentMedia,
      transcript: transcriptJson,
      metStart: startmet,
      metEnd: endmet,
      audioUrl: url,
      title: t,
      currentMission: mission,
    });
  }

  componentDidUpdate() {

    // DOM for timeline
    // only need this when transcripts are displayed
    if (this.state.timelineEnable){
      let parent = ReactDOM.findDOMNode(this).children[0].children[2].children[0];
      let timeline;
      let scrollHeight = 0;
      if (parent != undefined) {
        timeline =
          parent.children[0].children[0].children[0].children[0].children[1];
        let transcripts = this.state.transcript;
        transcripts.forEach((t) => (t.active = false));
        let activeIndex = getActiveIndex(
          transcripts,
          this.state.metStart + this.state.audio.time * 1000
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
  }

  render() {
    const { onEnd, autoplay } = this.props;
    let transcripts = this.state.transcript;
    let currentMission = this.state.currentMission;

    if (!this.state.audio.momentId) {
      return <div>Error fetching moment.</div>;
    }

    let { time } = this.state.audio;
    const momentMetStart = this.state.metStart;
    const currentMissionTime = momentMetStart + time * 1000;

    transcripts.forEach((t) => (t.active = false));
    const activeIndex = getActiveIndex(transcripts, currentMissionTime);

    if (activeIndex >= 0) {
      transcripts[activeIndex].active = true;
    }

    // If viewing a standalone moment, missionLength should be 1.
    const missionLength = currentMission ? currentMission.length : 1;

 
    return (
      <div>
        {/* {playlistNavBar} */}
        <div className="moment-viewer-container">
          <AudioPlayer
            title={this.state.title}
            url={this.state.audioUrl}
            start={this.state.metStart}
            end={this.state.metEnd}
            time={this.state.audio.time}
            playing={this.state.audio.playing}
            autoplay={autoplay}
            onEnd={onEnd}
            missionLength={missionLength}
            clickEvent={this.timelineClickEvent}
          />
          <div>
          <div type="button" className="btn btn-light" onClick={()=>this.toggleTimeline()}>
            {this.state.timelineEnable ? "Hide Transcript" : "Display Transcript"}
          </div>

          </div>
          {/* display transcript only if user click the display transcript button */}
          { this.state.timelineEnable &&
          <div style={{ marginTop: "0.5em" }} className="timeline-panel row">
            <ChannelTimeline
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
