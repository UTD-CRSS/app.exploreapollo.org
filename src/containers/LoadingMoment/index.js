import React, { Component } from "react";
import { AppHeader, AppFooter } from "../App";
import config from "../../../config";
import { fromJS } from "immutable";
import Spinner from "react-spinner";
import { PlaylistNavBar } from "../../components/PlaylistNavBar";

export class LoadingMoment extends Component {
  constructor(props) {
    super(props);

    this.state = { story: null, momentId: 0, storyMomentList: [] };
  }

  async componentDidMount() {
    let path = this.props.location.pathname;
    let storyId = path.split("/")[3];
    let momentId = path.split("/")[5];
    let storyMomentList = [];
    const response = await fetch(`${config.apiEntry}/api/stories/${storyId}`);
    let storyObj = await response.json();
    let momentList = fromJS(storyObj.momentList);
    momentList.forEach((m) => storyMomentList.push(m));
    this.setState({
      story: storyObj,
      momentId: momentId,
      storyMomentList: storyMomentList,
    });
    this.props.history.push(`/stories/story/${storyId}/moment/${momentId}`);
  }
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <PlaylistNavBar
          currentStory={this.state.story}
          currentMomentId={this.state.momentId}
          moments={this.state.storyMomentList}
          history={this.props.history}
        />
        <div className="text-center lead">
          <p>Loading moment...</p>
          <Spinner />
        </div>
        <AppFooter />
      </div>
    );
  }
}
