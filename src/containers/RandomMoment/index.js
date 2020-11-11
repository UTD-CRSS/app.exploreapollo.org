import React, { Component } from "react";
import { AppHeader, AppFooter } from "../App";
import config from "../../../config";
import { fromJS } from "immutable";

import Spinner from "react-spinner";

export class RandomMoment extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const moments = await fetch(`${config.apiEntry}/api/moments/random`);
    let momentsJson = await moments.json();
    let momentId = fromJS(momentsJson.id);
    this.props.history.push(`/moments/moment/${momentId}`);
  }
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <div className="text-center lead">
          <p>Loading A Random Moment...</p>
          <Spinner />
        </div>
        <AppFooter />
      </div>
    );
  }
}
