import React, {Component} from "react";
import classNames from "classnames";

import {
  StoryTimeline
} from "../../components";


export default class StoryViewer extends Component {
  render() {
    const classes = classNames("row");
    return (
      <div className={classes}>
        <StoryTimeline/>

        <div className="col-xs-8">
          <h1>Story Title</h1>
          <h2>
            First Moment <i className="glyphicon glyphicon-play"></i>
            <div>
              <small>
                20:00:00-24:00:00
              </small>
            </div>
          </h2>
          <p>
            info about the first moment
          </p>
          <h2>
            Second Moment <i className="glyphicon glyphicon-play"></i>
            <div>
              <small>
                20:00:00-24:00:00
              </small>
            </div>
          </h2>
          <p>
            info about the second moment
          </p>
        </div>
      </div>
    );
  }
}