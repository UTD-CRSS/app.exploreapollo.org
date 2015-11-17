import React, {Component} from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import {
  loadStory
} from "../../actions";

import {
  StoryTimeline
} from "../../components";


export default class StoryViewer extends Component {
  componentWillMount() {
    this.props.loadStory({
      storyId: this.props.currentStoryId
    });
  }
  render() {
    const classes = classNames("row");
    return (
      <div className={classes}>
        <StoryTimeline story={this.props.currentStory}/>
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