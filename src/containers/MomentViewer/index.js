import React, {Component} from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import {
  loadTimeline,
  fetchNotes
} from "../../actions";

import {
  MomentPlayer,
  Timeline,
  MomentNote
} from "../../components";

class MomentViewer extends Component {
  componentWillMount() {
    this.props.loadTimeline({
      momentId: this.props.momentId,
      met: 1111
    });
    this.props.fetchNotes({
      momentId: this.props.momentId,
      met: 1111
    });
  }

  render() {
    const classes = classNames("row");
    const timeline = this.props.timeline.timeline;
    const notes = this.props.notes.notes;
    return (
      <div>
        <MomentPlayer />
        <div className={classes}>
          <Timeline timeline={timeline} />
          <MomentNote note={notes} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id } = state.router.params;
  const timeline = state.timeline;
  const notes = state.notes;
  return {
    momentId: id,
    timeline,
    notes
  };
}

export default connect(mapStateToProps, {
  loadTimeline,
  fetchNotes
})(MomentViewer);
