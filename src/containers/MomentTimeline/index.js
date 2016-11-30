import React, {Component} from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
  loadStories
} from "../../actions";

import {StoryList} from "../../components";
import Spinner from "react-spinner";

export class Apollo11Explorer extends Component {
  componentWillMount() {
    this.props.loadStories();
  }
  render() {
    if (this.props.loading) {
      return (
        <div className="text-center lead">
          <p>Loading Stories...</p>
          <Spinner />
        </div>
      );
    }
		const Stories = _.sortBy(this.props.stories,"met_start");
    
    return (
      <div className="container">
        <div className="container" style={{display:"block",position:"relative",left:"25px"}}>
				  <a className="btn btn-sm btn-info" href="/stories/apollo11">
					  <h2>Show All</h2>
					  <h6>July 16-24</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/1">
					  <h2>Day 1</h2>
					  <h6>July 16th, 1969</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/2">
					  <h2>Day 2</h2>
					  <h6>July 17th, 1969</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/3">
					  <h2>Day 3</h2>
					  <h6>July 18th, 1969</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/4">
					  <h2>Day 4</h2>
					  <h6>July 19th, 1969</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/5">
					  <h2>Day 5</h2>
					  <h6>July 20th, 1969</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/6">
					  <h2>Day 6</h2>
					  <h6>July 21st, 1969</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/7">
					  <h2>Day 7</h2>
					  <h6>July 22nd, 1969</h6>
				  </a>
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/8">
					  <h2>Day 8</h2>
					  <h6>July 23rd, 1969</h6>
				  </a>				
				  <a className="btn btn-sm btn-primary" href="/stories/apollo11/9">
					  <h2>Day 9</h2>
					  <h6>July 24th, 1969</h6>
				  </a>
        </div>
        <div className="container" style={{position:"relative",top:"25px"}}>
  				<DayDisplay day={this.props.params.missionDay} allstories={Stories}/>
        </div>
			</div>
    );
  }
}

export function DayDisplay({day,allstories}){
  var imgUrl;
  var label;
  var text;
  var mstart;
  var mend;  
	var targetstories;
  
  
  switch(day){
		//DT - these imgur links below need to be replaced at some point as well. The current diagram is a modified version of one I found on google images. It should also be updated/replaced at some point.
		//DT - mstart / mend assume milliseconds from mission start for value.
    case "1":
      imgUrl = "http://i.imgur.com/s9ixciq.jpg";
      label = "Day 1 - July 16th, 1969";
      text = "The first day of the mission, the Saturn V rocket is launched from Cape Kennedy, Florida. It carries 3 astronauts: Commander Neil Armstrong, Command Module Pilot Michael Collins, and Lunar Module Pilot Edwin 'Buzz' Aldrin. Three stages of the Saturn V rocket are activated and the first two jettisoned until the spacecraft begins Earth orbit. After a full trip around the Earth, the third stage rockets fire again, and the astronauts are sent on their lunar trajectory. After a time, the third stage rocket is jettisoned to remove it from the flight path. On course for the moon, the astronauts go to sleep and prepare for the next day."
      mstart = 0;
      mend = 55680000;
      break;
    case "2":
      imgUrl = "http://i.imgur.com/0ChVX12.jpg";
      label = "Day 2 - July 17th, 1969";
      text = "A relatively uneventful day, Mission Control briefs the astronauts on news and current events back on earth. The spacecraft proceeds on its established trajectory, making some minor course corrections along the way. This evening, the astronauts conduct their first color telecast from space, mostly showing the view from within the command module."
      mstart = 55680001;
      mend = 142080000;
      break;
    case "3":
      imgUrl = "http://i.imgur.com/h7sOlQP.jpg";
      label = "Day 3 - July 18th, 1969";
      text = "Much like the previous day, the spacecraft continues on its trajectory. Housekeeping duties are performed including checks of fuel and oxygen reserves. Another telecast is coordinated by the crew, showing more of the Command Module, and including shots of Armstrong and Aldrin climbing through the Lunar Module hatch."
      mstart = 142080001;
      mend = 228479999;
      break;
    case "4":
      imgUrl = "http://i.imgur.com/Xi1tJna.jpg";
      label = "Day 4 - July 19th, 1969";
      text = "This afternoon, Lunar Orbit Insertion begins and, as the spacecraft goes through orbit, it passes behind the Moon, breaking radio contact with Earth for the first time in the mission. As orbit continues, the crew begin a telecast of the Moon's surface, focusing on the landing site. The Lunar Module is checked on once more for the night as the crew prepares for the landing the next day."
      mstart = 228480000;
      mend = 314879998;
      break;
    case "5":
      imgUrl = "http://i.imgur.com/G7Kl4P7.jpg";
      label = "Day 5 - July 20th, 1969";
      text = "This morning, Armstrong and Aldrin crawl into the Lunar Module and separate from Collins, who will stay in the Command Module during the moonwalk. This afternoon, the Lunar module makes its landing approach on the Lunar surface. Once the landing craft settles down in the Sea of Tranquility, Armstrong radios Mission Control, saying the famous words 'The Eagle has landed.' A few hours later, Armstrong and Aldrin begin their moonwalk, collecting samples and taking photos as they go. During this time, they plant the now-famous American flag on the lunar surface and set up several forms of monitoring equipment to collect and broadcast data back to Earth."
      mstart = 314879999;
      mend = 401279997;
      break;
    case "6":
      imgUrl = "http://i.imgur.com/FeQVo3A.jpg";
      label = "Day 6 - July 21st, 1969";
      text = "Shortly after midnight on this day, the moonwalkers confirm that they have completed all tasks asked of them on the lunar surface and, once confirmed, return to the landing craft. After removing the spacesuits that have sustained them for the last 3 hours, they go to sleep. When they awaken a few hours later, they begin ascent in the Lunar Module, using its descent stage as a launchpad. As the Lunar module completes its redocking with the Command Module, the landing craft is jettisoned."
      mstart = 401279998;
      mend = 487679996;
      break;
    case "7":
      imgUrl = "http://i.imgur.com/gcEVvU5.jpg";
      label = "Day 7 - July 22nd, 1969";
      text = "On this day, the spacecraft begins its transearth injection burn, sending the crew homeward. As it begins to be pulled in by the Earth's gravity, the crew makes a slight course correction and then later performs another live telecast to Earth."
      mstart = 487679997;
      mend = 574079995;
      break;
    case "8":
      imgUrl = "http://i.imgur.com/9pv1ERJ.jpg";
      label = "Day 8 - July 23rd, 1969";
      text = "A very uneventful day, the spacecraft continues its path towards Earth as the crew performs checks on all systems and talks with Mission Control. This evening, the final color TV transmission is made."
      mstart = 574079996;
      mend = 660479994;
      break;
    case "9":
      imgUrl = "http://i.imgur.com/6PezjeV.jpg";
      label = "Day 9 - July 24th, 1969";
      text = "As the spacecraft approaches its splashdown, the Service Module is jettisoned. Later, the Command module re-enters Earth's atmosphere and splashes down 825 nautical miles southwest of Honolulu, Hawaii and approximately 13 nautical miles away from the recovery ship. Half an hour later, the astronauts emerge from the module. Later this day, President Nixon calls the Apollo mission the 'greatest week in the history of the world since the Creation.'"
      mstart = 660479995;
      mend = 746879993;
      break;
    default:
      imgUrl = "https://s-media-cache-ak0.pinimg.com/originals/a0/d7/c0/a0d7c07a7893f9ed93bb4970bab41629.jpg";
      label = "Apollo 11";
      text = "The Apollo 11 mission " //DT - This needs to be updated
      mstart = -746879993;
      mend = 746879993;
  }
	targetstories = _.filter(allstories,function(story){return day == null || (story.met_start != null && ((story.met_start >= mstart && story.met_start <= mend) || (story.met_end >= mstart && story.met_end <= mend)));});
  return(
    <div className="container">			
				<img src={imgUrl} style={{display: "block", width: "100%", margin: "0 auto"}} />
				<h1>{label}</h1>
				<p>{text}</p>
        <div className="container">
          <h1>Stories</h1>
  				<StoryList stories={targetstories}/>
  			</div>
		</div>
  );
}

function mapStateToProps(state) {
  const {stories} = state;
  if (stories.loading) {
    return {
      loading: stories.loading
    };
  }
  return {
    loading: stories.loading,
    stories: stories.stories
  };
}

export default connect(mapStateToProps, {loadStories})(Apollo11Explorer);
