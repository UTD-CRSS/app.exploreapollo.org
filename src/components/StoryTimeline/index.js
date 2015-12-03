import React, {Component} from "react";
import _ from "lodash";

export class StoryCard extends Component {

  render() {
    const url = "/moments/moment/" + this.props.firstMomentId + "?story=" + this.props.id;
    return (
      <div className="story-timeline-item story-item">
        <div className="story-timeline-item-content">
          <div>
            <div className="story-timeline-title">
              {this.props.title}
            </div>
          </div>
          <div>
            <p className="story-timeline-content">
              {this.props.content}
            </p>
            <div className="story-timeline-play">
              <a href={url}>Play All <i className="glyphicon glyphicon-play"></i></a>
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
              {this.props.time}
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
              {this.props.time}
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
    const cards = _.sortBy(moments.concat(landmarks), "time");
    return cards.map((card) => {
      if(_.has(card, "description")){
        return (
          <MomentCard
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.description}
            time={card.time} />
        );
      } else {
        return (
          <LandmarkCard
            key={card.id}
            id={card.id}
            title={card.title}
            time={card.time} />
        );
      }
    });
  }
  render() {
    return (
      <div className="col-xs-10 col-xs-offset-2">
        <div className="row story-timeline-container">
          <div className="story-timeline-line"></div>
          <div className="col-md-9">
            <StoryCard title={this.props.story.title} content={this.props.story.description} id={this.props.story.id} firstMomentId={this.props.story.momentList[0].id}/>
            {this.renderCards()}
          </div>

        </div>

      </div>
    );
  }
}