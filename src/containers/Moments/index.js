import React, {Component} from "react";

import {MomentList} from "../../components";

export default class Moments extends Component {

  render() {
    const moments = [
      {id: 1, title: "Eagle Has Landed"},
      {id: 2, title: "One Small Step for Man"}
    ];
    return (
      <div>
        <h1>Moments</h1>
        <MomentList moments={moments} />
      </div>
    );
  }
}
