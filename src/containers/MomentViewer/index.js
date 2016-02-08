import React, {Component} from "react";
import { connect } from "react-redux";
import {get} from "lodash";

import Spinner from "react-spinner";

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
  WordCountGraph,
  LoadingIndicator
} from "../../components";

import getActiveIndex from "./getActiveIndex";

class MomentViewer extends Component {
  componentWillMount() {
    this.props.loadMoments({
      momentId: this.props.currentMomentId
    });
    this.props.loadTranscripts({
      momentId: this.props.currentMomentId
    });
    this.props.loadMetrics({
      momentId: this.props.currentMomentId
    });
  }

  render() {
    const {
      currentMoment,
      currentMission,
      loading,
      currentTranscripts,
      loadAudio,
      metrics
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

    const {time, playing, audio} = this.props.currentAudio;
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
    const missionLength = currentMission.length;

    const wordCountProps = {
      key: "WordCountGraph",
      title: "Word Count"
    };

    const momentWidgets = [
      metrics.loading
        ? <LoadingIndicator {...wordCountProps} />
        : <WordCountGraph data={metrics.WordCount} {...wordCountProps} />
    ];

    return (
      <div id="moment-viewer" className="inner-panel">
        <MomentPlayer
          title={title}
          url={audioUrl}
          start={metStart}
          end={metEnd}
          audio={audio}
          time={time}
          playing={playing}
          loadAudio={loadAudio}
          missionLength={missionLength} />
        <div style={{marginTop: "0.5em"}} className="timeline-panel row">
          <Timeline
            timeline={transcripts}
            clickEvent={timelineClickEvent}/>
          <MomentWidgets>
            {momentWidgets}
          </MomentWidgets>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {audio, metrics} = state;
  const { id } = state.router.params;
  const { loading, entities } = state.moments;
  if (loading) {
    return {
      currentMomentId: id,
      loading
    };
  }
  const transcripts = state.transcripts;
  const { moments, missions } = entities;
  const moment = get(moments, id);
  const mission = get(missions, moment.mission);

  return {
    currentMomentId: id,
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
