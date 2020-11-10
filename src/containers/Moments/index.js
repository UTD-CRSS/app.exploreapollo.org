import React, { Component } from "react";
import config from "../../../config";
import { AppHeader, AppFooter } from "../App";
import { MomentList } from "../../components";

export class Moments extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, moments: [] };
  }

  async componentDidMount() {
    const moments = await fetch(`${config.apiEntry}/api/moments`);
    const momentJson = await moments.json();

    this.setState({ loading: false, moments: momentJson });
  }
  render() {
    const moments = this.state.moments;

    return (
      <div className="app-container">
      <AppHeader />
        <div className="moments-container">
          <h1>Moments</h1>
          <MomentList moments={moments} />
        </div>
        <AppFooter />
      </div>
    );
  }
}