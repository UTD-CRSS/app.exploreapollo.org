import React, { Component } from "react";
import Spinner from "react-spinner";

import { PlaylistNavBar } from "../../components/PlaylistNavBar";

import { findIndex } from "lodash";
import config from "../../../config";

function getNextMoment(moments, currentMomentId) {
  const currentIndex = findIndex(moments, { id: Number(currentMomentId) });
  const nextIndex = currentIndex + 1;
  if (nextIndex < moments.length) {
    return moments[nextIndex];
  }
  return false;
}

export class PlaylistViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, story: [] };
  }
  async componentDidMount() {
    console.log(this.props);
    let currentStoryId = this.props.match.params.storyId;
    const response = await fetch(
      `${config.apiEntry}/api/stories/${currentStoryId}`
    );
    const json = await response.json();
    this.setState({ loading: false, story: json });
  }
  render() {
    // const {
    //   loading,
    //   currentStory,
    //   currentStoryId,
    //   currentMomentId,
    //   children,
    //   history,
    // } = this.props;

    const {loading, story} = this.state;
    const storyId = story.id;

    console.log(story);

    if (loading) {
      return (
        <div className="text-center lead">
          <p>Loading Story...</p>
          <Spinner />
        </div>
      );
    }

    const moments = story.momentList;
    const currentMomentId = moments[0].id;

    const onEnd = function () {
      const next = getNextMoment(moments, currentMomentId);
      if (next) {
        const nextUrl = `/stories/story/${storyId}/moment/${next.id}`;
        history.push(nextUrl);
      }
    };

    return (
      <div>
        <PlaylistNavBar
          currentStory={story}
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