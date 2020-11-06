import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-spinner";

import { loadStory } from "../../actions";

import PlaylistNavBar from "../../components/PlaylistNavBar";

import { findIndex } from "lodash";

function getNextMoment(moments, currentMomentId) {
  const currentIndex = findIndex(moments, { id: Number(currentMomentId) });
  const nextIndex = currentIndex + 1;
  if (nextIndex < moments.length) {
    return moments[nextIndex];
  }
  return false;
}

export class PlaylistViewer extends Component {
  componentDidMount() {
    const { loadStory, currentStoryId } = this.props;
    console.log(this.props);
    loadStory({
      storyId: currentStoryId,
    });
  }
  render() {
    const {
      loading,
      currentStory,
      currentStoryId,
      currentMomentId,
      children,
      history,
    } = this.props;

    console.log(this.props);

    if (loading) {
      return (
        <div className="text-center lead">
          <p>Loading Story...</p>
          <Spinner />
        </div>
      );
    }

    const moments = currentStory.momentList;
    const onEnd = function () {
      const next = getNextMoment(moments, currentMomentId);
      if (next) {
        const nextUrl = `/stories/story/${currentStoryId}/moment/${next.id}`;
        history.push(nextUrl);
      }
    };

    return (
      <div>
        <PlaylistNavBar
          currentStory={currentStory}
          currentMomentId={currentMomentId}
          moments={moments}
        />
        {children &&
          React.cloneElement(children, {
            autoplay: true,
            onEnd: onEnd.bind(this),
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { storyId, momentId } = state.router.params;
  const story = state.story;
  if (story.loading) {
    return {
      currentStoryId: storyId,
      loading: story.loading,
    };
  }
  return {
    currentStoryId: storyId,
    currentMomentId: momentId,
    loading: story.loading,
    currentStory: story,
  };
}

export default connect(mapStateToProps, {
  loadStory,
})(PlaylistViewer);
