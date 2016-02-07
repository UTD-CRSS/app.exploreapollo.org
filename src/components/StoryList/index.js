import React from "react";
import {Link} from "react-router";
import {keys} from "lodash";

export function StoryListItem({id, title, description}) {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <h2 testRef="storyTitle">{title}</h2>
        <p className="lead">{description}</p>
        <p>
          <Link
            className="btn btn-primary btn-lg"
            testRef="storyLink"
            to={`/stories/story/${id}`}>
            Launch
          </Link>
        </p>
      </div>
    </div>
  );
}

function renderStoryListItems(stories) {
  if (!stories || stories.length < 1) {
    return (
      <div testRef="errorMessage" className="alert alert-info">
        No Stories
      </div>
    );
  }
  return keys(stories).map((index) => {
    return (
      <StoryListItem
        key={stories[index].id}
        {...stories[index]} />
    );
  });
}

export default function StoryList({stories}) {
  return (
    <div testRefCollection="storyListContainer">
      {renderStoryListItems(stories)}
    </div>
  );
}
