import React, {Component} from "react";
import { connect } from "react-redux";
import {get} from "lodash";

import {
  loadMoments
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
  }

  render() {
    const {currentMoment, currentMission, loading} = this.props;
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
          missionLength={missionLength}
        />
        <div className="row">
          <Timeline />
          <MomentNote note={[]} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id } = state.router.params;
  const { loading, entities } = state.moments;
  if (loading) {
    return {
      currentMomentId: id,
      loading
    };
  }
  const { moments, missions } = entities;
  const moment = get(moments, id);
  const mission = get(missions, moment.mission);
  return {
    currentMomentId: id,
    loading,
    currentMission: mission,
    currentMoment: moment
  };
}

export default connect(mapStateToProps, {
  loadMoments
})(MomentViewer);
