import React, {Component} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {get} from "lodash";
import Spinner from "react-spinner";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import config from "../../../config";
import {fromJS} from "immutable";

import {
  loadMoments,
  loadTranscripts,
  loadAudio,
  loadMetrics
} from "../../actions";

import {
  MomentPlayer,
  Timeline,
  MomentWidgets,
  LoadingIndicator,
  SlideShowPanel,
  LineDiagram,
  BarDiagram,
  ChordDiagram,
  DashboardDiagram
} from "../../components";

import getActiveIndex from "./getActiveIndex";

export class MomentViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, audio: {playing: false, time: 0, momentId: 0},
    media: [], transcript: [], metric: []}
  }
  
  fetch(props) {
    props.loadAudio({
      time: 0,
      momentId: props.currentMomentId,
      playing: false
    });
    props.loadMoments({momentId: props.currentMomentId});
    props.loadTranscripts({momentId: props.currentMomentId});
    props.loadMetrics({momentId: props.currentMomentId});
  }

  async componentDidMount() {
    //this.fetch(this.props);

    let path = this.props.location.pathname
    let momentId = path.split("/")[3]  // get the momentId

    const moments = await fetch(`${config.apiEntry}/api/moments/${momentId}`)
    const momentJson = await moments.json()
    const momentMedia = fromJS(momentJson.media)
    
    const transcripts = await fetch(`${config.apiEntry}/api/moments/${momentId}/transcripts`)
    const transcriptJson = await transcripts.json()


    const metrics = await fetch(`${config.apiEntry}/api/moments/${momentId}/metrics`)
    const metricsJson = await metrics.json()

    this.setState({ 
      loading: false, audio:{ playing: false, time: 0, momentId: momentId},
      media: momentMedia, transcript: transcriptJson, metric: metricsJson
    })

  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentMomentId !== this.state.momentId) {
  //     this.fetch(nextProps);
  //   }
  //   //console.log(this.props)
  // }

  componentDidUpdate() {
    let parent = ReactDOM.findDOMNode(this).children[1].children[0].children[0];
    let timeline;
    let scrollHeight = 0;
    if(parent != undefined) {
      timeline = parent.children[0].children[0].children[0].children[1];
      let transcripts = this.state.transcript;
      transcripts = transcripts.map(index => index["active"] = false);
      let activeIndex = getActiveIndex(transcripts, this.state.media.metStart + (this.state.time * 1000));
      if(activeIndex < 0) {
        activeIndex = 0;
      }
      for(var i = activeIndex-2; i >= 0; i--) {
        var activeItem = timeline.children[i];
        if(activeItem != undefined) {
          scrollHeight += timeline.children[i].offsetHeight-1;
        }
      }
    }
    if(timeline != undefined) {
      timeline.scrollTop = scrollHeight;
    }
  }

  render() {
    const {
      //currentMoment,
      currentMission,
      //loading,
     // currentTranscripts,
      loadAudio,
      //metrics,
      onEnd,
      autoplay
    } = this.props;

    let currentMoment = this.state.audio.momentId
    let loading = this.state.loading
    let currentTranscripts = this.state.transcript
    let metrics = this.state.metric
    //let loadAudio = this.state.audio

    
    if (loading) {
      return <div className="text-center lead">
        <p>Loading moment...</p>
        <Spinner />
      </div>;
    }

    if (!currentMoment) {
      return <div>
        Error fetching moment.
      </div>;
    }

    const {time, playing} = this.state.audio;  //THIS NEEDS TO BE FIXED

   // let {transcripts} = currentTranscripts;
    //this is bad, but necessary until I can think of a clever solution
    let transcripts = currentTranscripts.map(function(i) {
      return i["active"] = false
      //return i.set("active", false);
    });

    const momentMetStart = currentMoment.metStart;
    const currentMissionTime = momentMetStart + (time * 1000);

    const activeIndex = getActiveIndex(
      transcripts,
      currentMissionTime
    );

    if(activeIndex >= 0) {
      const activeMessage = transcripts.get(activeIndex).set("active", true);
      transcripts = transcripts.set(activeIndex, activeMessage);
    }

    const timelineClickEvent = function(startTime) {
      const seekTime = (startTime - metStart) / 1000;
      if(metStart) {
        loadAudio({
          time: seekTime
        });
      }
    };

    const {
      title,
      audioUrl,
      metStart,
      metEnd
    } = currentMoment;

    // If viewing a standalone moment, missionLength should be 1.
    const missionLength = currentMission ? currentMission.length : 1;

    const slideShowProps = {key: "slideShow", title: "Media"};
    const slideShowWidget = loading
      ? <LoadingIndicator {...slideShowProps}/>
      : <SlideShowPanel images={currentMoment.media} {...slideShowProps}/>;

    const lineDiagramProps = {key: "LineDiagram", title: "Line Diagram"};
    const lineDiagramWidget = metrics.loading

      ? <LoadingIndicator {...lineDiagramProps}/>
      : <LineDiagram data={{
        time: currentMissionTime,
        start: currentMoment.metStart,
        end: currentMoment.metEnd,
        series: [
          {name: "ConversationRate", value: metrics.ConversationCount},
          {name: "TurnRate", value: metrics.TurnCount},
          {name: "WordRate", value:  metrics.WordCount}
        ]
      }} {...lineDiagramProps}/>;

    const barDiagramProps = {key: "BarDiagram", title: "Bar Diagram"};
    const barDiagramWidget = metrics.loading
      ? <LoadingIndicator {...barDiagramProps}/>
      : <BarDiagram data={{
        time: currentMissionTime,
        series: [
          //{name: "WordRate", value: metrics.WordCount}
        ]
      }} {...barDiagramProps}/>;

    const dashboardDiagramProps = {key: "DashboardDiagram", title: "Dashboard Diagram"};
    const dashboardDiagramWidget = metrics.loading
      ? <LoadingIndicator {...dashboardDiagramProps}/>
      : <DashboardDiagram data={{
        time: currentMissionTime,
        series: [
          //{name: "WordRate", value: metrics.WordCount}
        ]
      }} {...dashboardDiagramProps}/>;

    const chordDiagramProps = {key: "ChordDiagram", title: "Chord Diagram"};
    const chordDiagramWidget = metrics.loading
      ? <LoadingIndicator {...chordDiagramProps} />
      : <ChordDiagram data={{
        time: currentMissionTime,
        speakers: metrics.Speakers,
        interactions: metrics.InteractionMatrix
      }} {...chordDiagramProps} />;

    return (
      <div className="moment-viewer-container">
        <MomentPlayer
          title={title}
          url={audioUrl}
          start={metStart}
          end={metEnd}
          time={time}
          playing={playing}
          loadAudio={loadAudio}
          autoplay={autoplay}
          onEnd={onEnd}
          missionLength={missionLength}/>
        <div style={{marginTop: "0.5em"}} className="timeline-panel row">
          <Timeline
            timeline={transcripts}
            clickEvent={timelineClickEvent}/>
          <MomentWidgets>
            {slideShowWidget}
            <Tabs>
              <TabList>
                <Tab>LineDiagram</Tab>
                <Tab>BarDiagram</Tab>
                <Tab>ChordDiagram</Tab>
                <Tab>Dashboard</Tab>
              </TabList>
              <TabPanel>
                {lineDiagramWidget}
              </TabPanel>
              <TabPanel>
                {barDiagramWidget}
              </TabPanel>
              <TabPanel>
                {chordDiagramWidget}
              </TabPanel>
              <TabPanel>
                {dashboardDiagramWidget}
              </TabPanel>
            </Tabs>
          </MomentWidgets>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {audio, metrics} = state;
  const { momentId } = state.router.params;
  const { loading, entities } = state.moments;
  const { moments, missions } = entities;
  const moment = get(moments, momentId);
  if (loading || !moment) {
    return {
      currentMomentId: momentId,
      loading: true,
      currentAudio: audio
    };
  }
  const transcripts = state.transcripts;
  const mission = get(missions, moment.mission);

  return {
    currentMomentId: momentId,
    loading,
    currentMission: mission,
    currentMoment: moment,
    currentTranscripts: transcripts,
    currentAudio: audio,
    metrics
  };
}

export default connect(mapStateToProps, {
  loadMoments,
  loadTranscripts,
  loadAudio,
  loadMetrics
})(MomentViewer);
