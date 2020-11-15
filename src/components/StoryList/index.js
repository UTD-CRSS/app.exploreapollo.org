import React from "react";
import {keys} from "lodash";

export function StoryListItem({id, title, description}) {
  return (
    <div className="panel panel-default">
      <div className="panel-body" id="storylist-itembox">
        <h2 style={{ marginTop: "1em", marginLeft: "0.5em"}}>{title}</h2>
        <div className="lead" style={{marginLeft: "1em"}}>{description}</div>
        <div>
          <div style={{ marginTop: "1em", marginLeft: "1em" }}>
            <button className="btn btn-lg momentStoryButton" style={{marginBottom: "0.5em"}}>
              <a href={`/stories/story/${id}`}> Launch</a>
            </button>
          </div>
        </div>
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
