import React from "react";
import {Link} from "react-router-dom";
import {keys} from "lodash";

export function StoryListItem({id, title, description}) {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
        <p>
          <div style={{ marginTop: "2em" }}>
            <button className="btn btn-primary btn-lg">
              <Link to={`/stories/story/${id}`}> Launch</Link>
            </button>
          </div>
        </p>
      </div>
    </div>
  );
}

function renderStoryListItems(stories) {
  if (!stories || stories.length < 1) {
    return (
      <div className="alert alert-info">
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

export function StoryList({stories}) {
  return (
    <div>
      {renderStoryListItems(stories)}
    </div>
  );
}
