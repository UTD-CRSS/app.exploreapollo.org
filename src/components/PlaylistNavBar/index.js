import React from "react";
import styles from "./index.scss";
import {findIndex} from "lodash";
import {Link} from "react-router-dom";

function getCurrentIndex(moments, currentMomentId) {
  return findIndex(moments, {id: Number(currentMomentId)});
}

function getPrev(moments, currentMomentId, storyId) {
  const currentIndex = getCurrentIndex(moments, currentMomentId);
  const prevIndex = currentIndex - 1;

  if (prevIndex >= 0) {
    const momentId = moments[prevIndex].id;
    return `/stories/story/${storyId}/moment/${momentId}`;
  }

  return false;
}

function getNext(moments, currentMomentId, storyId) {
  // deadline lol
  // todo: dry
  const currentIndex = getCurrentIndex(moments, currentMomentId);
  const nextIndex = currentIndex + 1;

  if (nextIndex < moments.length) {
    const momentId = moments[nextIndex].id;
    return `/stories/story/${storyId}/moment/${momentId}`;
  }

  return false;
}

export default function PlaylistNavBar({currentStory, currentMomentId, moments}) {
  const prevUrl = getPrev(moments, currentMomentId, currentStory.id);
  const nextUrl = getNext(moments, currentMomentId, currentStory.id);
  return (
    <div className={styles.playlistNavBar}>
      <Link className={styles.storyName} style={{color: "white"}}
            to={`/stories/story/${currentStory.id}`}>
        <strong>{currentStory.title}</strong></Link>
      <div>
        {prevUrl && <Link to={prevUrl}
                          className="btn btn-default btn-lg">
          Previous
        </Link>}
        <span> </span>
        {nextUrl && <Link to={nextUrl}
                          className="btn btn-primary btn-lg">
          Next
        </Link>}
      </div>
    </div>
  );
}
