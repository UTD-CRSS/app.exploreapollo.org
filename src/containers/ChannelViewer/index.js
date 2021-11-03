import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import { ChannelPlayer } from "../../components/ChannelPlayer";
import { Link, Redirect } from "react-router-dom";
import { ChannelPlayerNavigatingInstruction } from "../../components/ChannelPlayerNavigatingInstruction";
import "./index.scss";

export class ChannelViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:
        this.props.location.state && this.props.location.state.audioData
          ? this.props.location.state.audioData
          : null,
      playAll: false,
      pauseAll: false,
      playNext: false,
      tapeId:
        this.props.location.state && this.props.location.state.tapeId
          ? this.props.location.state.tapeId
          : null,
      showInstruction: false,
      minBlock:
        this.props.location && this.props.location.state
          ? this.props.location.state.minBlock
          : null,
      maxBlock:
        this.props.location && this.props.location.state
          ? this.props.location.state.maxBlock
          : null,
      masterPlaybackTime: 0,
      masterChannelName: "",
    };
  }

  playAll() {
    this.setState({ playAll: true, pauseAll: false });
  }

  pauseAll() {
    this.setState({ pauseAll: true, playAll: false });
  }

  getNextBlockAndNuggetIndex() {
    var nextBlockIndex, nextNuggetIndex;
    let {currentBlockIndex, currentNuggetIndex} = this.state;
    currentNuggetIndex < 6 ? currentNuggetIndex++ : currentBlockIndex++;
    if (currentNuggetIndex < 6) {
      nextNuggetIndex = currentNuggetIndex + 1;
      nextBlockIndex = currentBlockIndex;
    } else {
      nextNuggetIndex = 1;
      nextBlockIndex = currentBlockIndex + 1;
    }
    // this.setState({nextBlockIndex: nextBlockIndex, nextNuggetIndex: nextNuggetIndex})
    return [nextBlockIndex, nextNuggetIndex];
  }

  getPreviousBlockAndNuggetIndex() {
    var nextBlockIndex, nextNuggetIndex;
    const {currentBlockIndex, currentNuggetIndex} = this.state;
    if (currentNuggetIndex > 1) {
      nextNuggetIndex = currentNuggetIndex - 1;
      nextBlockIndex = currentBlockIndex;
    } else {
      nextNuggetIndex = 6;
      nextBlockIndex = currentBlockIndex - 1;
    }
    return [nextBlockIndex, nextNuggetIndex];
  }
  /**
   *
   * @returns an array of channels currently being played
   */
  getPlayingChannels() {
    var playingChannels = [];
    var data = this.state.data;

    Object.keys(data).forEach((index) => {
      if (data[index].channel)
        playingChannels.push(data[index].channel.channelName);
    });

    return playingChannels;
  }

  handlePlayPrevious() {
    const [blockIndex, nuggetIndex] = this.getPreviousBlockAndNuggetIndex();
    const playingChannels = this.getPlayingChannels();
    this.setState({
      nextBlockIndex: blockIndex,
      nextNuggetIndex: nuggetIndex,
      playingChannels: playingChannels,
      playNextOrPreviousActivate: true,
    });
  }
  handleCloseInstruction = () => {
    this.setState({ showInstruction: false });
  };

  handleDisplayInstruction = () => {
    this.setState({ showInstruction: true });
  };

  handleSyncMasterTime(time, channel) {
    this.setState({ masterPlaybackTime: time, masterChannelName: channel });
  }
  handlePlayNext() {
    const [blockIndex, nuggetIndex] = this.getNextBlockAndNuggetIndex();
    const playingChannels = this.getPlayingChannels();
    this.setState({
      nextBlockIndex: blockIndex,
      nextNuggetIndex: nuggetIndex,
      playingChannels: playingChannels,
      playNextOrPreviousActivate: true,
    });
  }

  /**
   *  This function is called from child component when one of a audio player is pause or play
   */
  togglePausePlay() {
    this.setState({ playAll: false, pauseAll: false });
  }

  isFirstVisit() {
    return localStorage.getItem("alreadyVisitedChannelPlayerPage") === "true";
  }

  componentDidMount() {
    this.removeBrowserHistoryState();

    let visited = this.isFirstVisit();

    // Do not view popup if this isn't the first time
    if (visited) {
      this.setState({ showInstruction: false });
    } else {
      // This is the first time
      localStorage.setItem("alreadyVisitedChannelPlayerPage", true);
      this.setState({ showInstruction: true });
    }
  }

  removeBrowserHistoryState() {
    const { location, history } = this.props;
    if (history.location.state && history.location.state.audioData) {
      let state = { ...location.state };
      delete state.audioData;
      history.replace({ ...location, state });
    }

    if (
      this.state.data &&
      Object.keys(this.state.data).length > 0 &&
      this.state.data[0].channel
    ) {
      this.setState({
        currentBlockIndex: this.state.data[0].channel.blockIndex,
        currentNuggetIndex: this.state.data[0].channel.nuggetIndex,
      });
    }
  }

  render() {
    const missionName = this.props.match.params.mission;
    const {data, playNextOrPreviousActivate, playingChannels, nextBlockIndex, nextNuggetIndex, currentBlockIndex,
    currentNuggetIndex, tapeId, minBlock, maxBlock} = this.state;
    return (
      <>
        <AppHeader />
        {
          // playNext audio file of curent channels if user click play next button
          playNextOrPreviousActivate && (
            <Redirect
              to={{
                pathname: `/${missionName}/channels/load`,
                state: {
                  channels: {
                    selectedChannels: playingChannels,
                    blockIndex: nextBlockIndex,
                    nuggetIndex: nextNuggetIndex,
                    tapeId: tapeId,
                    minBlock: minBlock,
                    maxBlock: maxBlock
                  },
                },
              }}
            >
              {" "}
            </Redirect>
          )
        }
        <div className="container justify-content-center d-flex mb-3">
          <Link to={`/${missionName}/channels`}>
            <button
              type="button"
              className="btn btn-primary select-new-channel-btn audio-controller-text"
            >
              Select New Channels
            </button>
          </Link>
        </div>

        {data && Object.keys(data).length > 0 ? (
          <>
            <ChannelPlayerNavigatingInstruction
              handleClosePopup={this.handleCloseInstruction}
              showInstruction={this.state.showInstruction}
            />
            <div className="d-flex justify-content-center mb-4">
              <button
                type="button"
                disabled={
                  currentBlockIndex == minBlock && currentNuggetIndex == 1
                }
                className="btn btn-warning mr-3 audio-controller-text"
                onClick={this.handlePlayPrevious.bind(this)}
              >
                Play Previous
              </button>
              <button
                type="button"
                className="btn btn-success mr-3 audio-controller-text"
                onClick={this.playAll.bind(this)}
              >
                Play All
              </button>
              <button
                type="button"
                className="btn btn-primary mr-3 audio-controller-text"
                onClick={this.pauseAll.bind(this)}
              >
                Pause All
              </button>
              <button
                type="button"
                disabled={
                  currentBlockIndex == maxBlock && currentNuggetIndex == 6
                }
                className="btn btn-warning audio-controller-text"
                onClick={this.handlePlayNext.bind(this)}
              >
                Play Next
              </button>
            </div>
            <div className="row">
              {Object.keys(data).map((key) => {
                return (
                  <div className="col-lg row-md mt-3 mt-lg-0" key={key}>
                    <ChannelPlayer
                      playAll={this.state.playAll}
                      pauseAll={this.state.pauseAll}
                      togglePausePlay={this.togglePausePlay.bind(this)}
                      autoplay={false}
                      data={data[key]}
                      masterChannelName={this.state.masterChannelName}
                      masterPlaybackTime={this.state.masterPlaybackTime}
                      onSyncPlaybackTime={this.handleSyncMasterTime.bind(this)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="ml-2">
              <button
                type="button"
                className="btn btn-secondary mt-5"
                onClick={this.handleDisplayInstruction}
              >
                Instructions for navigating audio player page
              </button>
            </div>
          </>
        ) : (
          <h4 className="container text-center">
            Error loading channels, please select different channels
          </h4>
        )}

        <AppFooter />
      </>
    );
  }
}
