import React, { Component } from "react";
//import { connect } from "react-redux";
import Spinner from "react-spinner";
import { StoryTimeline } from "../../components";
import { dummyLandmarks } from "../../utils/dummyData";
import config from "../../../config";

export class StoryViewer extends Component {
  constructor() {
    super();
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
      <div>
        <StoryTimeline story={currentStory} landmarks={dummyLandmarks} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { storyId } = state.router.params;
  const story = state.story;
  if (story.loading) {
    return {
      currentStoryId: storyId,
      loading: story.loading,
    };
  }
  return {
    currentStoryId: storyId,
    loading: story.loading,
    currentStory: story,
  };
}

//export default connect(mapStateToProps, {
// loadStory
//})(StoryViewer);
