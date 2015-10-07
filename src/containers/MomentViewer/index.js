import React, {Component} from "react";

import {MomentPlayer} from "../../components";

export default class MomentViewer extends Component {
  render() {
    return (
      <div>
        <h1>Now Playing: Moment</h1>
        <MomentPlayer />
      </div>
    );
  }
}
