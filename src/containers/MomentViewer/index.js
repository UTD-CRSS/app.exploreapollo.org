import React, {Component} from "react";
import {connect} from "react-redux";
import {get} from "lodash";
import Spinner from "react-spinner";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";

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

class MomentViewer extends Component {

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

  componentWillMount() {
    this.fetch(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMomentId !== this.props.currentMomentId) {
      this.fetch(nextProps);
    }
  }

  render() {
    const {
      currentMoment,
      currentMission,
      loading,
      currentTranscripts,
      loadAudio,
      metrics,
      onEnd,
      autoplay
    } = this.props;

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

    const {time, playing} = this.props.currentAudio;
    let {transcripts} = currentTranscripts;

    //this is bad, but necessary until I can think of a clever solution
    transcripts = transcripts.map(function(i) {
      return i.set("active", false);
    });

    const momentMetStart = this.props.currentMoment.metStart;
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

    // If viewing a standablone moment, missionLength should be 1.
    const missionLength = currentMission ? currentMission.length : 1;

    const slideShowProps = {
      key: "slideShow",
      title: "Media"
    };
    const slideShowWidget = loading
      ? <LoadingIndicator {...slideShowProps} />
      : <SlideShowPanel images={currentMoment.media} {...slideShowProps} />;

    const lineDiagramProps = {
      key: "LineDiagram",
      title: "Line Diagram"
    };
    const lineDiagramWidget = metrics.loading
      ? <LoadingIndicator {...lineDiagramProps} />
      : <LineDiagram data={metrics.WordCount} {...lineDiagramProps} />;

    const barDiagramProps = {
      key: "BarDiagram",
      title: "Bar Diagram"
    };
    const barDiagramWidget = metrics.loading
      ? <LoadingIndicator {...barDiagramProps} />
      : <BarDiagram data={metrics.WordCount} {...barDiagramProps} />;

    const dashboardDiagramProps = {
      key: "DashboardDiagram",
      title: "Dashboard Diagram"
    };
    const dashboardDiagramWidget = metrics.loading
      ? <LoadingIndicator {...dashboardDiagramProps} />
      : <DashboardDiagram data={metrics.WordCount} {...dashboardDiagramProps} />;

    const chordDiagramProps = {
      key: "ChordDiagram",
      title: "Chord Diagram"
    };
    //TODO import real data
    const chordDiagramWidget = metrics.loading
      ? <LoadingIndicator {...chordDiagramProps} />
      : <ChordDiagram data={require("../../../resources/readme.json")} {...chordDiagramProps} />;

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
MomentViewer.defaultProps = {autoplay: true};



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
