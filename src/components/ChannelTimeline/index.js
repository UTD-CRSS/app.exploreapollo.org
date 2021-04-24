import React, { Component } from "react";
import classNames from "classnames";
import moment from 'moment'
function HumanReadableSec({sec}) {
  let format = "HH:mm:ss";


  // displaying seconds as hh:mm:ss format
  var timeStamp = moment.utc(moment.duration(sec, "seconds").asMilliseconds()).format(format)

  return <span>
    {timeStamp}
  </span>;
}
export function TimelineMessage({ name, text, active, startTime, clickEvent }) {
  const listItemClasses = classNames(
    "list-group-item",
    "transcript-item",
    "cursor-pointer",
    { active: active }
  );
  return (
    <a className={listItemClasses} onClick={clickEvent.bind(this, "viewer", startTime)}>
      <div>
        {/* <strong>{name}:</strong> */}
        <div className="start-time">
          {
          HumanReadableSec({ sec: startTime })
          }
        </div>
      </div>
      <div>{text}</div>
    </a>
  );
}

function TimelineList({ timeline, clickEvent,speakerName }) {
  if (!timeline || Object.keys(timeline).length < 1) {
    return (
      <div className="alert alert-info">
        Transcripts are not available
      </div>
    );
  }
  let items = timeline.map((item, index) => {
    return (
      <TimelineMessage
        key={index}
        active={item["active"]}
        clickEvent={clickEvent}
        startTime={item["startTime"]}
        text={item["text"]}
        name={speakerName}
      />
    );
  });
  return <div className="list-group">{items}</div>;
}

export class ChannelTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline: this.props.timeline,
      clickEvent: this.props.clickEvent,
      speakerName: this.props.speakerName
    };
  }

  componentDidUpdate() {}

  render() {
    const classes = classNames("timeline-container", "panel", "panel-default");
    return (
      <div className="col">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: "21px",
              left: 0,
            }}
          >
            <div className="transcript-panel">
              <div className={classes}>
                <div className="panel-heading">
                  <h3 className="panel-title">Transcript</h3>
                </div>
                <TimelineList
                  timeline={this.state.timeline}
                  clickEvent={this.state.clickEvent}
                  speakerName={this.state.speakerName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
