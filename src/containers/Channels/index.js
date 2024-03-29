import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import config from "../../../config";
import "./index.scss";
import { Link } from "react-router-dom";
import { ChannelsSelectingInstruction } from "../../components/ChannelsSelectingInstruction";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import getMissionData from "./getMissionData";

const NuggetPopup = (props) => (
  <Popover {...props} id="nugget-info-popup">
    <Popover.Content style={{ fontSize: "1.2em" }}>
      30-minute blocks of audios are divided futher into even smaller pieces
      called <strong>Nuggets. </strong>A nugget is usually 5 minutes long.
      Nugget 1 contains the first 5-minute audio of a block, nugget 2 contains
      the next 5 minutes (00:05:00-00:10:00), etc... In most cases, a block
      consists of 6 Nuggets
    </Popover.Content>
  </Popover>
);

const BlockPopup = (props) => {
  return (
    <Popover id="block-info-popup" {...props}>
      <Popover.Content style={{ fontSize: "1.2em" }}>
        A tape is usually more than 10 hours long so it is divided into smaller
        audio files called <strong>Blocks. </strong>A block is typically 30
        minutes long. Block 1 of a tape contains the first 30-minute audio,
        Block 2 contains the next 30 minutes (00:30:00-01:00:00) of that tape,
        etc...
      </Popover.Content>
    </Popover>
  );
};

const InfoButton = (props) => {
  let overlay;
  let text = "";
  if (props.blockInfo) {
    overlay = BlockPopup;
    text = "Block";
  } else if (props.nuggetInfo) {
    overlay = NuggetPopup;
    text = "Nugget";
  }
  return (
    <div className="info-button-container" style={{ cursor: "pointer" }}>
      <OverlayTrigger placement="top" delay={{ show: 100 }} overlay={overlay}>
        <div>
          <span className="info-text">{text}</span>
          <FontAwesomeIcon className="info-icon" icon={faQuestionCircle} />
        </div>
      </OverlayTrigger>
    </div>
  );
};

/**
 *
 * @param {Number} a
 * @param {Number} b
 * @returns random number ranages from a to b inclusive
 */
const getRandomRange = (a, b) => {
  let range = b - a;
  return Math.floor(Math.random() * (range + 1)) + a;
};

const HumanReadableTime = ({ unixTime }) => {
  const format = "MM/DD/YYYY - HH:mm:ss";

  // displaying seconds as hh:mm:ss format
  var timeStamp = moment.utc(unixTime, "X").format(format);

  return <>{timeStamp}</>;
};

const TapeItem = ({ tape, handleTapeSelectEvent }) => {
  const title = tape.title;
  const met_start = tape.met_start;
  const met_end = tape.met_end;
  const operation = tape.operation;
  return (
    <div
      className="channel-item-container channel-item-text tape"
      onClick={() => handleTapeSelectEvent(title)}
    >
      <div>
        <div
          className={`${
            tape.isSelected
              ? "channel-item-selected"
              : "channel-item-unselected"
          }`}
        ></div>
      </div>
      <div className="options-container col-12 d-flex">
        <div className="channel-item-title d-flex col-1 align-items-center">
          <div className="mr-2">Tape: </div>
          <div>{title}</div>
        </div>
        <div className="channel-item-title d-flex col-3 align-items-center pl-5">
          <div className="mr-2">Operation: </div>
          <div>{operation}</div>
        </div>
        <div className="col-4 channel-item-description d-flex align-items-center">
          <div className="mr-2">Start time: </div>
          <div>
            <HumanReadableTime unixTime={met_start} />
          </div>
        </div>
        <div className="col-4 channel-item-description d-flex align-items-center">
          <div className="mr-2">End time: </div>
          <div>
            <HumanReadableTime unixTime={met_end} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TapeSelectMenu = ({ tapes, handleTapeSelectEvent }) => {
  return (
    <div className="d-flex flex-column">
      <label className="option-label">Select a tape to play from</label>
      {Object.keys(tapes).map((tapeTitle) => {
        return (
          <TapeItem
            key={tapeTitle}
            tape={tapes[tapeTitle]}
            handleTapeSelectEvent={handleTapeSelectEvent}
          />
        );
      })}
    </div>
  );
};

const BlockSelectMenu = (props) => {
  const { handleValueChange, blockIndex, minBlock, maxBlock } = props;

  var blockIndexArr = [];
  for (var i = minBlock; i <= maxBlock; i++) {
    blockIndexArr.push(i);
  }
  return (
    <div className="channel-select-menu-containner">
      <label className="option-label mb-1">
        <span>Choose</span>
        <InfoButton blockInfo />
        <span>number:</span>
      </label>
      <select
        value={blockIndex}
        onChange={handleValueChange}
        className="custom-select w-50"
      >
        {blockIndexArr.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const NuggetSelectMenu = (props) => {
  const {handleValueChange, nuggetIndex, maxNuggetValue} = props;
  const numArray = [];
  for (let i = 0; i < maxNuggetValue; i++) {
    numArray.push(i+1);
  }
  return (
    <div className="channel-select-menu-containner">
      <label className="option-label mb-1">
        <span>Choose</span>
        <InfoButton nuggetInfo />
        <span>number:</span>
      </label>
      <select
        value={nuggetIndex}
        onChange={handleValueChange}
        className="custom-select w-50"
      >
        {numArray.map(num => <option value={num.toString()}>{num}</option>)}
      </select>
    </div>
  );
};

const ChannelItem = ({
  description,
  title,
  name,
  isSelected,
  clickSelectorEvent,
  numChannelsSelected,
}) => {
  var disabled = numChannelsSelected === 3 && !isSelected;
  return (
    <div
      className={`channel-item-container channel-item-text ${
        disabled ? "channel-item-disabled" : ""
      }`}
      onClick={() => !disabled && clickSelectorEvent(name)}
    >
      <div>
        <div
          className={`${
            isSelected ? "channel-item-selected" : "channel-item-unselected"
          }`}
        ></div>
      </div>
      <div className="options-container col-12 d-flex">
        <div className="channel-item-title d-flex col-3 align-items-center">
          <div className="mr-2">Channel: </div>
          <div>{title}</div>
        </div>
        <div className="col-9 channel-item-description d-flex align-items-center">
          <div className="mr-4">Description: </div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
};

const ChannelList = ({ channels, clickSelectorEvent, numChannelsSelected }) => {
  return (
    <>
      <label className="option-label">Select up to 3 channels</label>

      <div className="d-flex flex-column align-items-center">
        {Object.keys(channels).map((channelName) => {
          const channel = channels[channelName];
          return (
            <ChannelItem
              key={channelName}
              channelId={channel.id}
              description={channel.description}
              name={channel.name}
              title={channel.title}
              isSelected={channel.isSelected}
              clickSelectorEvent={clickSelectorEvent.bind(this)}
              numChannelsSelected={numChannelsSelected}
            />
          );
        })}
      </div>
    </>
  );
};

export class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelsLoaded: false,
      tapesLoaded: false,
      channels: {},
      selectedChannels: [],
      blockIndex: 1,
      nuggetIndex: 1,
      showInstruction: false,
      tapes: {},
      allChannels: {},
      selectedTape: "",
      filteredChannels: [],
      randomOptions: true,
      loadedChannelsInTape: {},
      loadedChannels: {},
      allChannelsLoaded: false,
    };
  }

  handleAdvancedOptionsClick = () => {
    this.setState({ randomOptions: false });
  };

  handleSeeLessOptionsClick = () => {
    this.setState({ randomOptions: true });
  };

  isChannelSelected = (channelName) => {
    return this.state.channels[channelName].isSelected;
  };

  setChannelSelectionStatus = (channelName, selectionStatus) => {
    const channels = this.state.channels;
    channels[channelName].isSelected = selectionStatus;
    this.setState({ channels: channels });
  }

  addChannelAndSetState = (channelName) => {
    const selectedChannels = this.state.selectedChannels;
    selectedChannels.push(channelName);
    this.setState({ selectedChannels: selectedChannels });
    this.setChannelSelectionStatus(channelName, true);
  };

  removeChannelAndSetState = (channelName) => {
    const selectedChannels = this.state.selectedChannels;
    const channelIndex = selectedChannels.indexOf(channelName);
    selectedChannels.splice(channelIndex, 1);
    this.setState({ selectedChannels: selectedChannels });
    this.setChannelSelectionStatus(channelName, false);
  };

  clickSelectorEvent = (channelName) => {
    this.isChannelSelected(channelName) ? this.removeChannelAndSetState(channelName) : this.addChannelAndSetState(channelName);
  };

  setTapeSelectionState = (tapeTitle, selectionStatus) => {
    const tapes = this.state.tapes;
    tapes[tapeTitle].isSelected = selectionStatus;
    this.setState({ tapes: tapes });
  }

  isTapeSelected = (tapeTitle) => {
    return this.state.tapes[tapeTitle].isSelected;
  };

  addTapeAndSetState = (tapeTitle) => {
    this.setState({ selectedTape: tapeTitle });
    this.setTapeSelectionState(tapeTitle, true);
  };

  removeTapeAndSetState = (tapeTitle) => {
    this.setState({ selectedTape: "", selectedChannels: [], channels: [] });
    this.setTapeSelectionState(tapeTitle, false);
  };

  clearTapeAndChannels() {
    const selectedTape = this.state.selectedTape;
    if (selectedTape.length > 0) {
      this.setTapeSelectionState(selectedTape, false);
    }
    this.setState({
      selectedTape: "",
      selectedChannels: [],
      filteredChannels: [],
      channels: [],
      channelsLoaded: false,
    });
  }

  getChannelsDataFromFilteredChannels() {
    const filteredChannels = this.state.filteredChannels;
    const allChannels = this.state.allChannels;
    let channelData = {};
    filteredChannels.forEach((channel) => {
      channelData[channel] = allChannels[channel];
    });
    return channelData;
  }

  handleTapeSelectEvent = async (tapeTitle) => {
    const tapeId = this.state.tapes[tapeTitle].id;
    if (!this.isTapeSelected(tapeTitle)) {
      this.clearTapeAndChannels();
      this.addTapeAndSetState(tapeTitle);
      await this.fetchAndGetChannelsBelongToTape(tapeId).then((channels) =>
        this.setState({
          filteredChannels: channels,
          channelsLoaded: true,
          blockIndex: this.state.tapes[tapeTitle].min_block,
        })
      );
    } else {
      this.removeTapeAndSetState(tapeTitle);
      this.setState({ filteredChannels: [], channelsLoaded: false });
    }
  };

  handleBlockInputChange = (event) => {
    const blockIndex = event.target.value;
    this.setState({ blockIndex: blockIndex });
  };

  handleNuggetInputChange = (event) => {
    const nuggetIndex = event.target.value;
    this.setState({ nuggetIndex: nuggetIndex });
  };

  handleCloseInstruction = () => {
    this.setState({ showInstruction: false });
  };

  handleDisplayInstruction = () => {
    this.setState({ showInstruction: true });
  };

  /**
   *
   * @returns true if alreadyVisitedChannelSelectingPage=true is stored in local storage, false otherwise
   */
  isFirstVisit() {
    return (
      localStorage.getItem("alreadyVisitedChannelSelectingPage") === "true"
    );
  }

  async fetchTapes() {
    const mission = this.props.match.params.mission;
    var tapes = {};
    await fetch(`${config.apiEntry}/api/missions/${mission}/tapes`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((tape) => {
          tapes[tape.title] = tape;
          tapes[tape.title].isSelected = false;
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return tapes;
  }

  async fetchAndGetAllChannels() {
    var allChannels = {};
    await fetch(`${config.apiEntry}/api/channels/`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((channel) => {
          allChannels[channel.name] = channel;
        });
      });

    return allChannels;
  }

  channelsOfTapeStoredInLocal(tapeId) {
    const loadedChannelsInTape = this.state.loadedChannelsInTape;

    return Object.keys(loadedChannelsInTape).includes(tapeId.toString());
  }

  async fetchAndGetChannelsBelongToTape(tapeId) {
    const mission = this.props.match.params.mission;
    if (!tapeId) return;
    var channels = [];
    let loadedChannelsInTape = this.state.loadedChannelsInTape;
    if (this.channelsOfTapeStoredInLocal(tapeId)) {
      return loadedChannelsInTape[tapeId];
    }
    await fetch(`${config.apiEntry}/api/missions/${mission}/tapes/${tapeId}/multi_channels`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((channel) => {
          if (!channels.includes(channel.channel_name)) {
            channels.push(channel.channel_name);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        channels = [];
      });
    loadedChannelsInTape[tapeId] = channels;
    // save channels belong to this tape for later use
    this.setState({ loadedChannelsInTape: loadedChannelsInTape });
    return loadedChannelsInTape[tapeId];
  }

  async componentDidUpdate(prevProps, prevData) {
    var channels = {};
    var filteredChannels = this.state.filteredChannels;

    if (prevData.filteredChannels !== filteredChannels) {
      channels = this.getChannelsDataFromFilteredChannels();
      this.setState({ channels: channels, selectedChannels: [] });
    }
  }

  async componentDidMount() {
    await this.fetchTapes().then((data) =>
      this.setState({ tapes: data, tapesLoaded: true })
    );
    await this.fetchAndGetAllChannels().then((data) =>
      this.setState({ allChannels: data, allChannelsLoaded: true })
    );
    let visited = this.isFirstVisit();

    // Do not view popup if this isn't the first time
    if (visited) {
      this.setState({ showInstruction: false });
    } else {
      // This is the first time
      localStorage.setItem("alreadyVisitedChannelSelectingPage", true);
      this.setState({ showInstruction: true });
    }
  }

  render() {
    const mission = this.props.match.params.mission;
    const {tapesLoaded, channelsLoaded, selectedChannels, filteredChannels, blockIndex,
    nuggetIndex, tapes, selectedTape, channels, allChannelsLoaded} = this.state;
    const disabled = selectedChannels.length > 0 ? false : true;
    const tapeId = selectedTape.length > 0 ? tapes[selectedTape].id : null;
    const minBlock =
      selectedTape.length > 0 ? tapes[selectedTape].min_block : null;
    const maxBlock =
      selectedTape.length > 0 ? tapes[selectedTape].max_block : null;
    
    let {missionName, maxNuggetValue} = getMissionData(mission);
    return (
      <div>
        <AppHeader />

        {!tapesLoaded && !allChannelsLoaded && (
          <p className="loading-text">LOADING DATA...</p>
        )}

        {tapesLoaded &&
          allChannelsLoaded &&
          (Object.keys(tapes).length === 0 ? (
            <div className="container">
              <h3>Sorry, we cannot find any tapes </h3>
            </div>
          ) : (
            <div className="channel-select-container container-xl">
              <div className="title-banner-container">
                <span className="title-banner-text">{missionName} Channels</span>
              </div>
              <TapeSelectMenu
                tapes={tapes}
                selectedTape={selectedTape}
                handleTapeSelectEvent={this.handleTapeSelectEvent}
              />
              {selectedTape.length > 0 && Object.keys(channels).length > 0 && (
                <ChannelList
                  numChannelsSelected={selectedChannels.length}
                  clickSelectorEvent={this.clickSelectorEvent}
                  channels={this.state.channels}
                />
              )}
              {selectedTape.length > 0 &&
                Object.keys(channels).length === 0 && (
                <div> Loading channels </div>
              )}
              {selectedTape.length > 0 &&
                filteredChannels.length === 0 &&
                channelsLoaded && (
                <p className="loading-text">
                    No audios available for this tape
                </p>
              )}
              {selectedChannels.length > 0 && this.state.randomOptions && (
                <div className="d-flex flex-column">
                  <div className="my-1">
                    <button
                      className="btn transparent-button btn-text"
                      onClick={this.handleAdvancedOptionsClick}
                    >
                      Advanced Options
                    </button>
                  </div>
                  <div>
                    <Link
                      className="link-btn-play"
                      to={{
                        pathname: `/channels/load/${mission}`,
                        state: {
                          channels: {
                            selectedChannels: selectedChannels,
                            blockIndex: getRandomRange(minBlock, maxBlock),
                            nuggetIndex: getRandomRange(1, 6),
                            tapeId: tapeId,
                            minBlock: minBlock,
                            maxBlock: maxBlock,
                          },
                        },
                      }}
                    >
                      <button className="play-channels-button btn btn-text">
                        Play Random
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              {selectedChannels.length > 0 && !this.state.randomOptions && (
                <>
                  <div>
                    <div className="my-1">
                      <button
                        className="btn transparent-button btn-text"
                        onClick={this.handleSeeLessOptionsClick}
                      >
                        See less
                      </button>
                    </div>
                    <div className="d-flex">
                      <div>
                        <BlockSelectMenu
                          minBlock={this.state.tapes[selectedTape].min_block}
                          maxBlock={this.state.tapes[selectedTape].max_block}
                          blockIndex={this.state.blockIndex}
                          handleValueChange={this.handleBlockInputChange}
                        />
                      </div>
                      <div>
                        <NuggetSelectMenu
                          nuggetIndex={this.state.nuggetIndex}
                          handleValueChange={this.handleNuggetInputChange}
                          maxNuggetValue={maxNuggetValue}
                        />
                      </div>
                    </div>
                    <div>
                      <Link
                        className="link-btn-play"
                        to={{
                          pathname: `/channels/load/${mission}`,
                          state: {
                            channels: {
                              selectedChannels: selectedChannels,
                              blockIndex: blockIndex,
                              nuggetIndex: nuggetIndex,
                              tapeId: tapeId,
                              minBlock: minBlock,
                              maxBlock: maxBlock,
                            },
                          },
                        }}
                      >
                        <button
                          disabled={disabled}
                          className="play-channels-button btn btn-text"
                        >
                          Play
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
              <button
                type="button"
                className="btn btn-secondary mt-5"
                onClick={this.handleDisplayInstruction}
              >
                Instructions for selecting channels
              </button>
            </div>
          ))}

        <ChannelsSelectingInstruction
          handleClosePopup={this.handleCloseInstruction}
          showInstruction={this.state.showInstruction}
        />
        <AppFooter />
      </div>
    );
  }
}
