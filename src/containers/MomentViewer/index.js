import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spinner from "react-spinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import config from "../../../config";
import { fromJS } from "immutable";
import { metrics as setMetrics } from "../../reducers";
import { AppFooter, AppHeader } from "../App";

import {
  MomentPlayer,
  Timeline,
  MomentWidgets,
  LoadingIndicator,
  SlideShowPanel,
  LineDiagram,
  BarDiagram,
  ChordDiagram,
  DashboardDiagram,
  PlaylistNavBar,
} from "../../components";

import getActiveIndex from "./getActiveIndex";

export class MomentViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    };
    this.timelineClickEvent = this.timelineClickEvent.bind(this);
  }

  timelineClickEvent = function (comp, startTime) {
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

  async componentDidMount() {
    let path = this.props.location.pathname;
    let momentId;
    let storyId;
    let storyObj;
    let storyMomentList = [];
    if (path.includes("story")) {
      momentId = path.split("/")[5]; // get the momentId
      storyId = path.split("/")[3];
      const response = await fetch(`${config.apiEntry}/api/stories/${storyId}`);
      storyObj = await response.json();
      let momentList = fromJS(storyObj.momentList);
      momentList.forEach((m) => storyMomentList.push(m));
    } else {
      momentId = path.split("/")[3]; // get the momentId
      storyObj = null;
      storyId = 0;
      storyMomentList = [];
    }

    const moments = await fetch(`${config.apiEntry}/api/moments/${momentId}`);
    const momentJson = await moments.json();
    const momentMedia = fromJS(momentJson.media);
    const startmet = fromJS(momentJson.metStart);
    const endmet = fromJS(momentJson.metEnd);
    const url = fromJS(momentJson.audioUrl);
    const t = fromJS(momentJson.title);
    const mission = fromJS(momentJson.mission);

    const transcripts = await fetch(
      `${config.apiEntry}/api/moments/${momentId}/transcripts`
    );
    const transcriptJson = await transcripts.json();

    const orgMetrics = await fetch(
      `${config.apiEntry}/api/moments/${momentId}/metrics`
    );
    const metricsJson = await orgMetrics.json();

    this.setState({
      loading: false,
      audio: { playing: false, time: 0, momentId: momentId },
      media: momentMedia,
      transcript: transcriptJson,
      metric: metricsJson,
      metStart: startmet,
      metEnd: endmet,
      audioUrl: url,
      title: t,
      currentMission: mission,
      story: storyObj,
      storyId: storyId,
      storyMomentList: storyMomentList,
    });
  }

  componentDidUpdate() {
    let parent = ReactDOM.findDOMNode(this).children[2].children[1].children[0];
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

  render() {
    const { onEnd, autoplay } = this.props;

    let loading = this.state.loading;
    let transcripts = this.state.transcript;
    let metrics = setMetrics(this.state.metric);
    let currentMission = this.state.currentMission;

    const playlistNavBar = (
      <PlaylistNavBar
        currentStory={this.state.story}
        currentMomentId={this.state.audio.momentId}
        moments={this.state.storyMomentList}
        history={this.props.history}
      />
    );

    if (loading) {
      return (
        <div className="app-container">
          <AppHeader />
          {playlistNavBar}
          <div className="text-center lead">
            <p>Loading moment...</p>
            <Spinner />
          </div>
          <AppFooter />
        </div>
      );
    }

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

    const slideShowProps = { key: "slideShow", title: "Media" };
    const slideShowWidget = loading ? (
      <LoadingIndicator {...slideShowProps} />
    ) : (
      <SlideShowPanel images={this.state.media} {...slideShowProps} />
    );

    const lineDiagramProps = {
      key: "LineDiagram",
      title: "Line Diagram",
      containerWidth: 315,
      containerHeight: 315,
    };
    const lineDiagramWidget = metrics.loading ? (
      <LoadingIndicator {...lineDiagramProps} />
    ) : (
      <LineDiagram
        data={{
          time: currentMissionTime,
          start: this.state.metStart,
          end: this.state.metEnd,
          series: [
            { name: "ConversationRate", value: metrics.ConversationCount },
            { name: "TurnRate", value: metrics.TurnCount },
            { name: "WordRate", value: metrics.WordCount },
          ],
        }}
        {...lineDiagramProps}
      />
    );

    const barDiagramProps = { key: "BarDiagram", title: "Bar Diagram" };
    const barDiagramWidget = metrics.loading ? (
      <LoadingIndicator {...barDiagramProps} />
    ) : (
      <BarDiagram
        data={{
          time: currentMissionTime,
          series: [
            //{name: "WordRate", value: metrics.WordCount}
          ],
        }}
        {...barDiagramProps}
      />
    );

    const dashboardDiagramProps = {
      key: "DashboardDiagram",
      title: "Dashboard Diagram",
    };
    const dashboardDiagramWidget = metrics.loading ? (
      <LoadingIndicator {...dashboardDiagramProps} />
    ) : (
      <DashboardDiagram
        data={{
          time: currentMissionTime,
          series: [
            //{name: "WordRate", value: metrics.WordCount}
          ],
        }}
        {...dashboardDiagramProps}
      />
    );

    const chordDiagramProps = { key: "ChordDiagram", title: "Chord Diagram" };
    const chordDiagramWidget = metrics.loading ? (
      <LoadingIndicator {...chordDiagramProps} />
    ) : (
      <ChordDiagram
        data={{
          time: currentMissionTime,
          speakers: metrics.Speakers,
          interactions: metrics.InteractionMatrix,
        }}
        {...chordDiagramProps}
      />
    );

    return (
      <div className="app-container">
        <AppHeader />
        {playlistNavBar}
        <div className="moment-viewer-container">
          <MomentPlayer
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
          <div style={{ marginTop: "0.5em" }} className="timeline-panel row">
            <Timeline
              timeline={transcripts}
              clickEvent={this.timelineClickEvent}
            />
            <MomentWidgets>
              {slideShowWidget}
              <Tabs>
                <TabList>
                  <Tab>LineDiagram</Tab>
                  <Tab>BarDiagram</Tab>
                  <Tab>ChordDiagram</Tab>
                  <Tab>Dashboard</Tab>
                </TabList>
                <TabPanel>{lineDiagramWidget}</TabPanel>
                <TabPanel>{barDiagramWidget}</TabPanel>
                <TabPanel>{chordDiagramWidget}</TabPanel>
                <TabPanel>{dashboardDiagramWidget}</TabPanel>
              </Tabs>
            </MomentWidgets>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
