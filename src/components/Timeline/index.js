import React from "react";
import classNames from "classnames";
import {HumanReadableMs} from "../";

export function TimelineMessage({name, text, active, startTime, clickEvent}) {
  const listItemClasses = classNames(
    "list-group-item",
    "transcript-item",
    "cursor-pointer",
    {active: active}
  );
  return (
    <a className={listItemClasses}
      onClick={clickEvent.bind(this, startTime)}>
      <div>
        <strong>{name}:</strong>
        <div className="start-time">
          {HumanReadableMs({ms: startTime})}
        </div>
      </div>
      <div>
        {text}
      </div>
    </a>
  );
}

function TimelineList({timeline, clickEvent}) {
  if (!timeline || timeline.size < 1) {
    return (
      <div className="alert alert-info">No Messages</div>
    );
  }
  let items = timeline.map((item) => {
    return (
      <TimelineMessage
        key={item.get("id")}
        id={item.get("id")}
        name={item.get("speakerName")}
        active={item.get("active")}
        clickEvent={clickEvent}
        startTime={item.get("metStart")}
        text={item.get("text")}/>
    );
  });
  return (
    <div className="list-group">
      {items}
    </div>
  );
}

export default function Timeline({timeline, clickEvent}) {
  const classes = classNames(
    "timeline-container",
    "panel",
    "panel-default"
  );

  return (
    <div className="col-md-6">
      <div style={{position: "relative", width: "100%", height: "100%"}}>
        <div style={{position: "absolute", top: 0, right: 0, bottom: "21px", left: 0}}>
            <div className="transcript-panel">
              <div className={classes}>
                <div className="panel-heading">
                  <h3 className="panel-title">Transcript</h3>
                </div>
                <TimelineList
                  timeline={timeline}
                  clickEvent={clickEvent}/>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
