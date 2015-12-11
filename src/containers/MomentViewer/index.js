import React, {Component} from "react";
import { connect } from "react-redux";
import {get, findIndex, each} from "lodash";

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
    const currentMissionTime = this.props.currentMoment.metStart + (time * 1000);
    let activeIndex = findIndex(currentTranscripts.transcripts, function(i) {
      return i.startTime > currentMissionTime;
    });

    //this is bad, but necessary until I can think of a clever solution
    each(currentTranscripts.transcripts, function(i) {
      i.active = false;
    });

    activeIndex -= 1;
    if(activeIndex >= 0) {
      currentTranscripts.transcripts[activeIndex].active = true;
    }
    const timelineClickEvent = function(startTime) {
      if(metStart) {
        loadAudio({
          time: (startTime - metStart) / 1000
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
    return (
      <div>
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
        <div className="row">
          <Timeline timeline={currentTranscripts.transcripts} clickEvent={timelineClickEvent}/>
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
