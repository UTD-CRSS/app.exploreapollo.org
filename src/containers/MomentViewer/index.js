import React, {Component} from "react";

import {MomentPlayer, Timeline, MomentNote} from "../../components";

export default class MomentViewer extends Component {
  render() {
  	const timeline = [
      {id: 1, name: "Niel", text: "One small step for man."},
      {id: 2, name: "Niel", text: "One giant step for mankind!"},
      {id: 3, name: "Buzz", text: "Don't worry, Woody. In just a few hours you'll be sitting around a campfire with Andy making delicious hot Schmoes."},
      {id: 4, name: "Buzz 2", text: "Quick, help me prop up Vegetable man here or we're done for!"},
      {id: 5, name: "Buzz", text: "Etch, Draw that man in a Chicken Suit."},
      {id: 6, name: "Rex", text: "It's the chicken man!"},
      {id: 7, name: "Buzz", text: "Woody once risked his life to save mine, and I couldn't call myself his friend if I wasn't willing to do the same. Now who's with me?"},
      {id: 8, name: "Rex", text: "But look at my little arms! I can't press the \"fire\" button and jump at the same time!"},
      {id: 9, name: "Buzz", text: "Good work, men. Two blocks down and only nineteen more to go."}
    ];

    const notes = [
    	{id: 1, title: "We landed on the moon!", text: "We did that!"}
    ]

    return (
      <div>
        <h1>Now Playing: Moment</h1>
        <MomentPlayer />
        <div class="row">
	        <Timeline timeline={timeline} />
	        <MomentNote note={notes} />
        </div>
      </div>
    );
  }
}
