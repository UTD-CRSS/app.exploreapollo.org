import React, {Component} from "react";
import _ from "lodash";
import {Link} from "react-router";
import {HumanReadableMs} from "../";

export class StoryCard extends Component {

  render() {
    const url = "/moments/moment/" + this.props.firstMomentId + "?story=" + this.props.id;
    return (
      <div className="jumbotron text-center" style={{
        margin: 0
      }}>
        <div className="story-timeline-item-content">
          <h2 className="story-timeline-title">
            {this.props.title}
          </h2>
          <p className="lead">
            {this.props.description}
          </p>
          <div>
            <div className="story-timeline-play">
              <Link className="btn btn-lg btn-primary" to={url}>Play All <i className="glyphicon glyphicon-play"></i></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class MomentCard extends Component {
  render() {
    const url = "/moments/moment/" + this.props.id;
    return(
      <div className="story-timeline-item story-item">
        <div className="story-timeline-item-node"></div>
        <div className="story-timeline-item-content">
          <div>
            <div className="story-timeline-title">
              {this.props.title}
            </div>
            <div className="story-timeline-time">
              <HumanReadableMs ms={this.props.metStart} />
            </div>
          </div>
          <div>
            <p className="story-timeline-content">
              {this.props.content}
            </p>
            <div className="story-timeline-play">
              <a href={url}>Listen <i className="glyphicon glyphicon-play"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export class LandmarkCard extends Component {
  render() {
    return(
      <div className="story-timeline-item landmark-item">
        <div className="story-timeline-item-node"></div>
        <div className="story-timeline-item-content">
          <div>
            <div className="story-timeline-title">
              {this.props.title}
            </div>
            <div className="story-timeline-time">
              <HumanReadableMs ms={this.props.metStart} />
            </div>
          </div>
        </div>
      </div>
    );
  }
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
    return (
      <div>
        <StoryCard {...this.props.story} firstMomentId={this.props.story.momentList[0].id}/>
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
