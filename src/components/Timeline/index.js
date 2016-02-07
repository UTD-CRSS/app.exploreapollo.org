import React, {Component} from "react";
import classNames from "classnames";
import {HumanReadableMs} from "../";

export class TimelineMessage extends Component {
  render() {
    const {name, text, active, startTime} = this.props;
    return (
      <a className="list-group-item transcript-item cursor-pointer"
         onClick={this.props.clickEvent.bind(this, startTime)}>
        <div>
          <strong>
            {name}:
          </strong>
          <div className="start-time">
            {HumanReadableMs({ms: startTime})}
          </div>
        </div>
        <div>
          <span className={classNames({"active-transcript": active})}>
            {active} {text}
          </span>
        </div>
      </a>
    );
  }
}

export default class Timeline extends Component {

  renderList() {
    const {timeline, clickEvent} = this.props;
    if (!timeline || timeline.length < 1) {
      return (
        <div ref="errorMessage" className="alert alert-info">No Messages</div>
      );
    }
    let items = timeline.map((item) => {
      return (
        <TimelineMessage
          key={item.id}
          id={item.id}
          name={item.speakerName}
          active={item.active}
          clickEvent={clickEvent}
          startTime={item.metStart}
          text={item.text} />
      );
    });
    return (
      <div className="list-group">
        {items}
      </div>
    )
  }

  render() {
    let classes = classNames("timeline-container", "panel", "panel-default");
    return (
      <div className="col-md-6">
        <div refCollection="timelineContainer" className={classes}>
          <div className="panel-heading">
            <h3 className="panel-title">Transcript</h3>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
}
