import React, {Component} from "react";

export default class MomentPlayer extends Component {
  render() {
    return (
      <audio
        controls
        preload
        src="https://aqueous-garden-9236.herokuapp.com/stream.mp3">
      </audio>
    );
  }
}
