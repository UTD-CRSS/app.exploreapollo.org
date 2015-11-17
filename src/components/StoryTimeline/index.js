import React, {Component} from "react";

export class StoryCard extends Component {

  render() {
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
              <a href="#">Play All <i className="glyphicon glyphicon-play"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class MomentCard extends Component {
  render() {
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
              <a href="#">Listen <i className="glyphicon glyphicon-play"></i></a>
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
  render() {
    return (
      <div className="col-xs-10 col-xs-offset-2">
        <div className="row story-timeline-container">
          <div className="story-timeline-line"></div>
          <div className="col-md-9">
            <StoryCard title={this.props.story.title} content={this.props.story.description}/>
            <MomentCard title="Countdown" content="T Minus" time="-000:10:00"/>
            <LandmarkCard title="Blast Off!" time="000:00:00"/>
            <MomentCard title="Moon Landing!" content="That time where we sent some guys to walk on that thing in the sky." time="108:14:00"/>
          </div>

        </div>

      </div>
    );
  }
}