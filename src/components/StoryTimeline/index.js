import React, { Component } from "react";
import _ from "lodash";
import { HumanReadableMs } from "../";
import mediaplay from "../../../node_modules/open-iconic/png/media-play-2x.png";

function PlayAllButton({ storyId, momentId }) {
  const url = `/stories/story/${storyId}/moment/${momentId}`;
  return (
    <div>
      <div className="story-timeline-play">
        <div style={{ marginTop: "2em" }}>
          <button className="btn btn-lg momentStoryButton">
            <a href={url}> Play All</a>
          </button>
        </div>
      </div>
    </div>
  );
}

function NoMomentsNotice() {
  return (
    <div className="alert alert-info">
      This story does not have any moments yet
    </div>
  );
}

export function StoryCard({
  showPlayAll = false,
  storyId,
  firstMomentId,
  title,
  description,
}) {
  return (
    <div className="jumbotron clearfix">
      <div className="col-sm-6 col-sm-offset-3 story-timeline-item-content">
        <h2 className="story-timeline-title">{title}</h2>
        <p className="lead">{description}</p>
        {showPlayAll && _.isNumber(firstMomentId) ? (
          <PlayAllButton momentId={firstMomentId} storyId={storyId} />
        ) : (
          <NoMomentsNotice />
        )}
      </div>
    </div>
  );
}

export function MomentCard({ id, storyId, title, metStart, content }) {
  const url = storyId
    ? `/stories/story/${storyId}/moment/${id}`
    : `/moments/moment/${id}`;
  return (
    <div className="panel panel-default story-timeline-item story-item" id="momentlist-itembox">
      <div className="story-timeline-item-node" />
      <div className="panel-body story-timeline-item-content clearfix">
        <div className="float-left" style={{marginLeft:"1em"}}>
          <div className="story-timeline-title">{title}</div>
          <div className="story-timeline-time">
            {HumanReadableMs({ ms: metStart, date: true, year: true })}
          </div>
          <p className="story-timeline-content">{content}</p>
        </div>
        <div className="story-timeline-play float-right" style={{marginRight:"1em"}}>
          <div style={{ marginTop: "1em" }}>
            <button className="btn btn-lg momentStoryButton">
              <a href={url}>
                {" "}
                <img src={mediaplay} />{" "}
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandmarkCard({ id, title, metStart }) {
  return (
    <div key={title + id} className="story-timeline-item landmark-item">
      <div className="story-timeline-item-node"></div>
      <div className="story-timeline-item-content">
        <div>
          <div className="story-timeline-title">{title}</div>
          <div className="story-timeline-time">
            {HumanReadableMs({ ms: metStart })}
          </div>
        </div>
      </div>
    </div>
  );
}

export class StoryTimeline extends Component {
  renderCards() {
    // const {landmarks} = this.props;
    let landmarks = []; //TEMPORARY UNTIL WE GET LANDMARKS SORTED OUT :)
    const moments = this.props.story.momentList;
    const cards = _.sortBy(moments.concat(landmarks), "met_start");
    return cards.map((card) => {
      if (_.has(card, "description")) {
        return (
          <MomentCard
            key={card.id}
            id={card.id}
            storyId={this.props.story.id}
            title={card.title}
            content={card.description}
            metStart={card.met_start}
            time={card.time}
          />
        );
      } else {
        return (
          <LandmarkCard
            key={card.id}
            id={card.id}
            title={card.title}
            metStart={card.met_start}
            time={card.time}
          />
        );
      }
    });
  }
  render() {
    const { story } = this.props;
    const { momentList } = story;

    const isMomentListEmpty = _.isEmpty(momentList);
    const showPlayAll = !isMomentListEmpty;
    const firstMomentId = (_.head(momentList) || {}).id;

    return (
      <div>
        <StoryCard
          showPlayAll={showPlayAll}
          storyId={story.id}
          firstMomentId={firstMomentId}
          {...story}
        />
        <div className="col-xs-10 col-xs-offset-2">
          <div className="row story-timeline-container">
            {/* <div className="story-timeline-line"></div> */}
            <div className="col-md-9">{this.renderCards()}</div>
          </div>
        </div>
      </div>
    );
  }
}
