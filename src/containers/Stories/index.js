import React, { Component } from "react";

import { StoryList } from "../../components";
import Spinner from "react-spinner";
import config from "../../../config";
import { AppHeader, AppFooter } from "../App";

export class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, stories: [] };
  }

  async componentDidMount() {
    let stories = await fetch(`${config.apiEntry}/api/stories`);
    let storyJson = await stories.json();

    this.setState({ loading: false, stories: storyJson });
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="app-container">
          <AppHeader />
          <div className="text-center lead">
            <p>Loading Stories...</p>
            <Spinner />
          </div>
          <AppFooter />
        </div>
      );
    }
    const Stories = this.state.stories;
    return (
      <div className="app-container">
        <AppHeader />
        <div className="container">
          <h1>Stories</h1>
          <StoryList stories={Stories} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
