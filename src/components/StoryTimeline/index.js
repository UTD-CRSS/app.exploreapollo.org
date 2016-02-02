import React, {Component} from "react";
import _ from "lodash";
import {Link} from "react-router";
import {HumanReadableMs} from "../";

function PlayAllButton({storyId, momentId}) {
  const url = "/moments/moment/" + momentId + "?story=" + storyId;
  return (<div>
    <div className="story-timeline-play">
      <Link className="btn btn-lg btn-primary" to={url}>Play All <i className="glyphicon glyphicon-play"></i></Link>
    </div>
  </div>);
}

function NoMomentsNotice() {
  return (<div className="alert alert-info">
    This story does not have any moments yet
  </div>);
}

export function StoryCard({
  showPlayAll = false,
  storyId,
  firstMomentId,
  title,
  description
}) {
  return (<div className="jumbotron text-center" style={{margin: 0}}>
    <div className="story-timeline-item-content">
      <h2 className="story-timeline-title">
        {title}
      </h2>
      <p className="lead">
        {description}
      </p>
      {showPlayAll && _.isNumber(firstMomentId)
        ? <PlayAllButton momentId={firstMomentId} storyId={storyId} />
        : <NoMomentsNotice />}
    </div>
  </div>);
}

export function MomentCard({id, title, metStart, content}) {
  const url = "/moments/moment/" + id;
  return (<div className="story-timeline-item story-item">
    <div className="story-timeline-item-node" />
    <div className="story-timeline-item-content">
      <div>
        <div className="story-timeline-title">
          {title}
        </div>
        <div className="story-timeline-time">
          <HumanReadableMs ms={metStart} />
        </div>
      </div>
      <div>
        <p className="story-timeline-content">
          {content}
        </p>
        <div className="story-timeline-play">
          <a href={url}>Listen <i className="glyphicon glyphicon-play"></i></a>
        </div>
      </div>
    </div>
  </div>);
}

export function LandmarkCard({id, title, metStart}) {
  return (<div key={title+id}className="story-timeline-item landmark-item">
    <div className="story-timeline-item-node"></div>
    <div className="story-timeline-item-content">
      <div>
        <div className="story-timeline-title">
          {title}
        </div>
        <div className="story-timeline-time">
          <HumanReadableMs ms={metStart} />
        </div>
      </div>
    </div>
  </div>);
}

export default class StoryTimeline extends Component {
  renderCards() {
    const {landmarks} = this.props;
    const moments = this.props.story.momentList;
    const cards = _.sortBy(moments.concat(landmarks), "metStart");
    return cards.map((card) => {
      if(_.has(card, "description")){
        return (
          <MomentCard
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.description}
            metStart={card.metStart}
            time={card.time} />
        );
      } else {
        return (
          <LandmarkCard
            key={card.id}
            id={card.id}
            title={card.title}
            metStart={card.metStart}
            time={card.time} />
        );
      }
    });
  }
  render() {
    const {story} = this.props;
    const {momentList} = story;

    const isMomentListEmpty = _.isEmpty(momentList);
    const showPlayAll = !isMomentListEmpty;
    const firstMomentId = (_.head(momentList) || {}).id

    return (
      <div>
        <StoryCard showPlayAll={showPlayAll}
                   storyId={story.id}
                   firstMomentId={firstMomentId}
                   {...story} />
        <div className="col-xs-10 col-xs-offset-2">
          <div className="row story-timeline-container">
            <div className="story-timeline-line"></div>
            <div className="col-md-9">
              {this.renderCards()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
