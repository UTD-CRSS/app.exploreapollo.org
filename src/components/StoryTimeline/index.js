import React, {Component} from "react";

export class MomentNode extends Component {
  renderMomentTitles() {
    const {moments} = this.props;
    return moments.map((moment) => {
      return (
        <div>
         - {moment.name}
        </div>
      );
    });
  }

  render() {
    const {offset} = this.props;
    return (
      <div className="moment-container"
        style={{"top": `${offset}px`}}>
        <div className="moment-node"></div>
        <div className="moment-title-container">
          {this.renderMomentTitles()}
        </div>
      </div>
    );
  }
}


export default class StoryTimeline extends Component {
  renderNodes() {
    const nodes = [
      {
        "id": 1,
        "moments": [{"name": "test moment 1"}, {"name": "test moment 2"}],
        "offset": 10
      },{
        "id": 2,
        "moments": [{"name": "test moment 3"}, {"name": "test moment 4"}],
        "offset": 50
      },{
        "id": 3,
        "moments": [{"name": "test moment 5"}, {"name": "test moment 6"}],
        "offset": 90
      }
    ];
    return nodes.map((node) => {
      return (
        <MomentNode
          key={node.id}
          moments={node.moments}
          offset={node.offset}/>
      );
    });
  }

  render() {
    return (
      <div className="col-xs-3 story-timeline-container" ref="timelineContainer">
        <div className="story-timeline">
        </div>
        {this.renderNodes()}
      </div>
    );
  }
}