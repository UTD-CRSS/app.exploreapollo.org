import React from "react";
import styles from "./index.scss";

function getCurrentIndex(moments, currentMomentId) {
  for (let i = 0; i < moments.length; i++) {
    if (moments[i].get("id") == currentMomentId) return i;
  }
  return -1;
  //return findIndex(moments, { id: Number(currentMomentId) });
}

function getPrev(moments, currentMomentId, storyId) {
  const currentIndex = getCurrentIndex(moments, currentMomentId);
  const prevIndex = currentIndex - 1;

  if (prevIndex >= 0) {
    const momentId = moments[prevIndex].get("id");
    return `/stories/story/${storyId}/loading/${momentId}`;
  }

  return false;
}

function getNext(moments, currentMomentId, storyId) {
  const currentIndex = getCurrentIndex(moments, currentMomentId);
  const nextIndex = currentIndex + 1;

  if (nextIndex < moments.length) {
    const momentId = moments[nextIndex].get("id");
    return `/stories/story/${storyId}/loading/${momentId}`;
  }

  return false;
}

export function PlaylistNavBar({
  currentStory,
  currentMomentId,
  moments,
  history,
}) {
  if (
    currentStory == null &&
    !history.location.pathname.includes("story") &&
    !history.location.pathname.includes("loading")
  ) {
    return <div></div>;
  } else if (currentStory == null) {
    return <h3>Loading...</h3>;
  }
  const prevUrl = getPrev(moments, currentMomentId, currentStory.id);
  const nextUrl = getNext(moments, currentMomentId, currentStory.id);

  return (
    <div className={styles.playlistNavBar}>
      <a
        className={styles.storyName}
        style={{ color: "white" }}
        to={`/stories/story/${currentStory.id}`}
      >
        <strong>{currentStory.title}</strong>
      </a>
      <div>
        {prevUrl && <a href={prevUrl}>Previous</a>}
        <h1> </h1>
        {nextUrl && <a href={nextUrl}>Next</a>}
      </div>
    </div>
  );
}
