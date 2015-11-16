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
      </div>
    );
  }
}