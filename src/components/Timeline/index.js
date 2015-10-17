import React, {Component} from "react";
import classNames from "classnames";

export class TimelineMessage extends Component {
  render() {
    const {name, text} = this.props;
    return (
      <div>
        <p>
          <strong>
            {name}:
          </strong>
          <span>
            {text}
          </span>
        </p>
      </div>
    );
  }
}

export default class Timeline extends Component {
  renderList() {
    const {timeline} = this.props;
    if (!timeline || timeline.length < 1) {
      return (
        <div ref="errorMessage" className="alert alert-info">No Messages</div>
      );
    }

    return timeline.map((timeline) => {
      return (
        <TimelineMessage
          key={timeline.id}
          id={timeline.id}
          name={timeline.name}
          text={timeline.text} />
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