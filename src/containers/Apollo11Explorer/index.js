import React, { Component } from "react";
import _ from "lodash";
import { DayDisplay } from "../../components";
import { AppFooter, AppHeader } from "../App";
import config from "../../../config";
import apollo11logo from "../../../static/FastFactsimgs/apollo11logo.jpg";
import Crew from "../../../static/FastFactsimgs/apollo11crew.jpg";
import { StoryList } from "../../components";
import Spinner from "react-spinner";

export class Apollo11Explorer extends Component {
  constructor() {
    super();
    this.state = { loading: true, stories: [] };
  }
  async componentDidMount() {
    const response = await fetch(`${config.apiEntry}/api/stories`);
    const json = await response.json();
    this.setState({ loading: false, stories: json });
  }

  checkDay() {
    var mstart;
    var mend;
    const stories = _.sortBy(this.state.stories, "met_start");
    let tempUrl = this.props.location.pathname;
    const day = tempUrl.split("/")[3];
    var targetstories = [];
    switch (day) {
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

    targetstories = _.filter(stories, function (story) {
      return (
        day == null ||
        (story.met_start != null &&
          ((story.met_start >= mstart && story.met_start <= mend) ||
            (story.met_start < mstart && story.met_end > mstart)))
      );
    });

    if (_.isEmpty(targetstories)) {
      return (
        <div>
          <div className="panel panel-default story-timeline-item story-item">
            <h3>&nbsp;No stories on this day</h3>
            <h3>&nbsp;</h3>
          </div>
          <p>&nbsp;</p>
        </div>
      );
    } else {
      return <StoryList stories={targetstories} />;
    }
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
    const url = "/apollo11/";
    return (
      <div className="app-container">
        <AppHeader />
        <h4 className="center">
          <div className="titleBanner">
            <b>
              "That's one small step for man, one giant leap for mankind." -
              Neil Armstrong, Apollo 11
            </b>
          </div>
        </h4>

        <div className="row fastfacts">
          <div className="col-sm-6">
            <h3>
              {" "}
              <br></br>
              <b> Fast Facts</b>
              <br></br>
              <br></br>
            </h3>
            <h4>
              <b>Information: </b>
            </h4>
            1. Astronauts: Neil Armstrong, Buzz Aldrin, and Michael Collins{" "}
            <br></br>
            2. This was the first manned mission to successfully reach the moon.{" "}
            <br></br>
            3. The American flag that was planted on the moon by the astronauts
            was made by Sears. <br></br>
            4. Apollo 11 was launched at the same time of the Soviet's Sputnik.{" "}
            <br></br>
            5. President John F. Kennedy was more interested in the Space Race
            than he was of what the astronauts would find in space. <br></br>
            6. When Armstrong, Aldrin, and Collins returned back to Earth, they
            were placed in quarantine because scientists were inconclusive about
            space germs entering Earth. <br></br> <br></br>
            <h4>
              <b>Significance: </b>
            </h4>
            1. Apollo 11 was the first mission to successfully place men on the
            moon. <br></br>
            2. Neil Armstrong marked the occasion with his famous quote: "That's
            one small step for man, one giant leap for mankind." <br></br>{" "}
            <br></br>
            Pictured Left to Right <br></br>
            1. Neil Armstrong (Mission Commander)<br></br>
            2. Michael Collins (Command Module Pilot) <br></br>
            3. Edwin (Buzz) Aldrin (Lunar Module Pilot) <br></br>
          </div>

          <div className="col-sm-6">
            <img
              src={apollo11logo}
              className="center addpadding"
              width="70%"
              height="auto"
            />
            <img
              src={Crew}
              className="center addpadding"
              width="80%"
              height="auto"
            />
          </div>
        </div>
        <div className="container">
          <DayDisplay
            day={this.props.location.pathname.split("/")[3]}
            url={url}
          />
          {this.checkDay()}
        </div>
        <AppFooter />
      </div>
    );
  }
}
