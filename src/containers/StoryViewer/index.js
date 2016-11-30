import React, {Component} from "react";
import { connect } from "react-redux";
import Spinner from "react-spinner";

import {loadStory} from "../../actions";
import {StoryTimeline} from "../../components";
import {dummyLandmarks} from "../../utils/dummyData";
import {DayDisplay} from "../../components";

export class StoryViewer extends Component {
  componentWillMount() {
    const {loadStory, currentStoryId} = this.props;
    loadStory({
      storyId: currentStoryId
    });
  }
  render() {
    const {loading, currentStory} = this.props;
    const day = this.props.params.missionDay;

    const url = `/stories/story/${this.props.params.storyId}/`;
    if (loading) {
      return <div className="text-center lead">
        <p>Loading Story...</p>
        <Spinner />
      </div>;
    }

    return (
      
      <div>
        <div className="container">
          <DayDisplay day={this.props.params.missionDay} url={url}/>
        </div>
        <StoryTimeline
          story={currentStory}
          landmarks={dummyLandmarks}
          missionDay={this.props.params.missionDay}/>
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
      loading: story.loading
    };
  }
  return {
    currentStoryId: storyId,
    loading: story.loading,
    currentStory: story
  };
}

export default connect(mapStateToProps, {
  loadStory
})(StoryViewer);
