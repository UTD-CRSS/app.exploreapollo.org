import React, {Component} from "react";
import _ from "lodash";
import {Link} from "react-router-dom";
import {HumanReadableMs} from "../";

function PlayAllButton({storyId, momentId}) {
  const url = `/stories/story/${storyId}/moment/${momentId}`;
  return (
    <div>
      <div className="story-timeline-play">
        <Link className="btn btn-lg btn-primary" to={url}>
          Play All
          <i className="glyphicon glyphicon-play" />
        </Link>
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
  description
}) {
  return (
    <div className="jumbotron clearfix">
      <div className="col-sm-6 col-sm-offset-3 story-timeline-item-content">
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
    </div>
  );
}

export function MomentCard({id, storyId, title, metStart, content}) {
  const url = `/stories/story/${storyId}/moment/${id}`;
  return (
    <div className="panel panel-default story-timeline-item story-item">
      <div className="story-timeline-item-node" />
      <div className="panel-body story-timeline-item-content clearfix">
        <div className="pull-left">
          <div className="story-timeline-title">
            {title}
          </div>
          <div className="story-timeline-time">
            {HumanReadableMs({ms: metStart, date: true})}
          </div>
          <p className="story-timeline-content">
            {content}
          </p>
        </div>
        <div className="story-timeline-play pull-right">
            <Link to={url} className="btn btn-lg btn-primary">
              <i className="glyphicon glyphicon-play" />
            </Link>
          </div>
      </div>
    </div>
  );
}

export function LandmarkCard({id, title, metStart}) {
  return (
    <div key={title+id}className="story-timeline-item landmark-item">
      <div className="story-timeline-item-node"></div>
      <div className="story-timeline-item-content">
        <div>
          <div className="story-timeline-title">
            {title}
          </div>
          <div className="story-timeline-time">
            {HumanReadableMs({ms: metStart})}
          </div>
        </div>
      </div>
    </div>
  );
}

export class Apollo11StoryTimeline extends Component {
  //const {landmarks} = this.props;
  checkDay(){
    var mstart;
    var mend;
    const day = this.props.missionDay;

    let landmarks = []; //TEMPORARY UNTIL WE GET LANDMARKS SORTED OUT :)
    const moments = this.props.story.momentList;
    const cards = _.sortBy(moments.concat(landmarks), "met_start"); 

    var targetcards = [];
    switch(day){
      case "1":
        mstart = 0;
        mend = 55680000;
        break;
      case "2":
        mstart = 55680001;
        mend = 142080000;
        break;
      case "3":
        mstart = 142080001;
        mend = 228479999;
        break;
      case "4":
        mstart = 228480000;
        mend = 314879998;
        break;
      case "5":
        mstart = 314879999;
        mend = 401279997;
        break;
      case "6":
        mstart = 401279998;
        mend = 487679996;
        break;
      case "7":
        mstart = 487679997;
        mend = 574079995;
        break;
      case "8":
        mstart = 574079996;
        mend = 660479994;
        break;
      case "9":
        mstart = 660479995;
        mend = 746879993;
        break;
      default:
        mstart = -746879993;
        mend = 746879993;    
    }
    

    //DT - fills targetcards with moments that start, end or pass through the selected day (e.g. a moment that starts on day 1 then ends on day 4 would register for days 1,2,3, and 4)
    targetcards = _.filter(
      cards,function(card){
        return card == null || (card.met_start != null && ((card.met_start >= mstart && card.met_start <= mend) || (card.met_start < mstart && card.met_end > mstart)));
      }
    );  

    if(_.isEmpty(targetcards)){
      return (
        <div>
          <div className="panel panel-default story-timeline-item story-item">
            
            <h3>&nbsp;No moments on this day</h3>
            <h3>&nbsp;</h3>
          </div> 
          <p>&nbsp;</p>
        </div>
      );
    }
    return targetcards.map((card) => {
      if(_.has(card, "description")){
        return (
          <MomentCard
            key={card.id}
            id={card.id}
            storyId={this.props.story.id}
            title={card.title}
            content={card.description}
            metStart={card.met_start}
            time={card.time} />
        );
      } else {
        return (
          <LandmarkCard
            key={card.id}
            id={card.id}
            title={card.title}
            metStart={card.met_start}
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
    const firstMomentId = (_.head(momentList) || {}).id;
    
    return (
      <div className="container">
        <div className="story-timeline-container">
          <div>
            <StoryCard showPlayAll={showPlayAll}
                   storyId={story.id}
                   firstMomentId={firstMomentId}
                   {...story} />  
          </div>
          <h1>&nbsp;</h1>  
          {this.checkDay()}

        </div>  
      </div>  
    );
  }
}
