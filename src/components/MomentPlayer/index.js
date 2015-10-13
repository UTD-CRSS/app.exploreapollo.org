import React, {Component} from "react";

export default class MomentPlayer extends Component {
  render() {
    return (
			<div>
				<h1>
					Now Playing: [ moment title ]
				</h1>
				<audio
					controls
					preload
					src="https://aqueous-garden-9236.herokuapp.com/stream.mp3">
				</audio>
			</div>
    );
  }
}
