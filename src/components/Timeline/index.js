import React, {Component} from "react";
import classNames from "classnames";

export class TimelineMessage extends Component {
  render() {
    const {name, text, active, startTime} = this.props;
    return (
      <div>
        <p className="cursor-pointer" onClick={this.props.clickEvent.bind(this, startTime)}>
          <strong>
            {name}:
          </strong>
          <span className={classNames({"active-transcript": active})}>
            {active} {text}
          </span>
        </p>
      </div>
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
    return timeline.map((item) => {
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
  }

  render() {
    let classes = classNames("col-md-6", "timeline-container");
    return (
      <div refCollection="timelineContainer" className={classes}>
        {this.renderList()}
      </div>
    );
  }
}