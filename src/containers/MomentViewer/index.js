import React, {Component} from "react";
import { connect } from "react-redux";
import {get, filter} from "lodash";

import {
  loadMoments,
  loadTranscripts,
  loadAudio
} from "../../actions";

import {
  MomentPlayer,
  Timeline,
  MomentNote
} from "../../components";

class MomentViewer extends Component {
  componentWillMount() {
    this.props.loadMoments({
      momentId: this.props.currentMomentId
    });
    this.props.loadTranscripts({
      transcripts: this.props.currentTranscripts
    });
  }

  render() {
    const {
      currentMoment,
      currentMission,
      loading,
      currentTranscripts,
      loadAudio
    } = this.props;
    if (loading) {
      return <div>
        Loading Moment.
      </div>;
    }

    if (!currentMoment) {
      return <div>
        Error fetching moment.
      </div>;
    }

    const {time, playing, audio} = this.props.currentAudio;
    const currentMissionTime = this.props.currentMoment.startSlice + (time * 1000);
    const visibleTranscript = filter(currentTranscripts.transcripts, function(i) {
      return i.startTime <= currentMissionTime;
    });

    const {
      title,
      audioUrl,
      startSlice,
      endSlice
    } = currentMoment;
    const missionLength = currentMission.length;
    return (
      <div>
        <MomentPlayer
          title={title}
          url={audioUrl}
          start={startSlice}
          end={endSlice}
          audio={audio}
          time={time}
          playing={playing}
          loadAudio={loadAudio}
          missionLength={missionLength} />
        <div className="row">
          <Timeline timeline={visibleTranscript}/>
          <MomentNote note={[]} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {audio} = state;
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
    currentAudio: audio
  };
}

export default connect(mapStateToProps, {
  loadMoments,
  loadTranscripts,
  loadAudio
})(MomentViewer);
