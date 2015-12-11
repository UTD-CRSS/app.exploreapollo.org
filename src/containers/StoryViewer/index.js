import React, {Component} from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import Spinner from "react-spinner";

import {
  loadStory
} from "../../actions";

import {
  StoryTimeline
} from "../../components";

import {
  dummyLandmarks
} from "../../utils/dummyData";

export default class StoryViewer extends Component {
  componentWillMount() {
    this.props.loadStory({
      storyId: this.props.currentStoryId
    });
  }
  render() {
    const classes = classNames("row");
    if (this.props.loading) {
      return <div className="text-center lead">
        <p>Loading Story...</p>
        <Spinner />
      </div>;
    }

    return (
      <div className={classes}>
        <StoryTimeline story={this.props.currentStory} landmarks={dummyLandmarks}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { id } = state.router.params;
  const story = state.story;
  if (story.loading) {
    return {
      currentStoryId: id,
      loading: story.loading
    };
  }
  return {
    currentStoryId: id,
    loading: story.loading,
    currentStory: story
  };
}

export default connect(mapStateToProps, {
  loadStory
})(StoryViewer);
