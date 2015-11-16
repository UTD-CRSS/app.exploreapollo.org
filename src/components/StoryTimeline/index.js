import React, {Component} from "react";

export default class StoryTimeline extends Component {

  render() {
    return (
      <div className="col-xs-10 col-xs-offset-2">
        
        <div className="row story-timeline-container">
          <div className="story-timeline-line"></div>
          <div className="col-md-9">
            <div className="story-timeline-item">
              <div className="story-timeline-item-node"></div>
              <div className="story-timeline-item-content">
                <div>
                  <div className="story-timeline-title">
                    First Moment
                  </div>
                  <div className="story-timeline-time">
                    20:00:00-24:00:00
                  </div>
                </div>
                <div>
                  <p className="story-timeline-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lorem sapien. Nunc dignissim auctor ligula, nec pretium est scelerisque id. Curabitur tincidunt porta risus a pellentesque.
                  </p>
                  <div className="story-timeline-play">
                    <a href="#">Listen <i className="glyphicon glyphicon-play"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-timeline-item">
              <div className="story-timeline-item-node"></div>
              <div className="story-timeline-item-content">
                <div>
                  <div className="story-timeline-title">
                    First Moment
                  </div>
                  <div className="story-timeline-time">
                    20:00:00-24:00:00
                  </div>
                </div>
                <div>
                  <p className="story-timeline-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lorem sapien. Nunc dignissim auctor ligula, nec pretium est scelerisque id. Curabitur tincidunt porta risus a pellentesque.
                  </p>
                  <div className="story-timeline-play">
                    <a href="#">Listen <i className="glyphicon glyphicon-play"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-timeline-item">
              <div className="story-timeline-item-node"></div>
              <div className="story-timeline-item-content">
                <div>
                  <div className="story-timeline-title">
                    First Moment
                  </div>
                  <div className="story-timeline-time">
                    20:00:00-24:00:00
                  </div>
                </div>
                <div>
                  <p className="story-timeline-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lorem sapien. Nunc dignissim auctor ligula, nec pretium est scelerisque id. Curabitur tincidunt porta risus a pellentesque.
                  </p>
                  <div className="story-timeline-play">
                    <a href="#">Listen <i className="glyphicon glyphicon-play"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-2 story-play-all">
            <a href="#">Play All <i className="glyphicon glyphicon-play"></i></a>
          </div>

        </div>

      </div>
    );
  }
}