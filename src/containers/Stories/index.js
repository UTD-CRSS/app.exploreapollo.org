import React, {Component} from "react";

import {StoryList} from "../../components";

export default class Stories extends Component {

  render() {
    const Stories = [
      {id: 1, title: "Eagle Has Landed"},
      {id: 2, title: "One Small Step for Man"}
    ];
    return (
      <div>
        <h1>Stories</h1>
        <StoryList stories={Stories} />
      </div>
    );
  }
}
