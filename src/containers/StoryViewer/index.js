import React, { Component } from "react";
import Spinner from "react-spinner";
import { StoryTimeline } from "../../components";
import { dummyLandmarks } from "../../utils/dummyData";
import config from "../../../config";
import { AppHeader, AppFooter } from "../App";

export class StoryViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, story: [] };
  }
  async componentDidMount() {
    let currentStoryId = this.props.match.params.storyId;
    const response = await fetch(
      `${config.apiEntry}/api/stories/${currentStoryId}`
    );
    const json = await response.json();
    this.setState({ loading: false, story: json });
  }
  render() {
    let currentStory = this.state.story;
    if (this.state.loading) {
      return (
        <div className="text-center lead">
          <p>Loading Story...</p>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="app-container">
        <AppHeader />
        <div>
          <StoryTimeline story={currentStory} landmarks={dummyLandmarks} />
        </div>
        <AppFooter />
      </div>
    );
  }
}