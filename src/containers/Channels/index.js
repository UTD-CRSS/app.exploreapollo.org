import React, { Component } from "react";
import { AppFooter, AppHeader } from "../App";
import config from "../../../config";
import "./index.scss";
import { Link } from "react-router-dom";
import { ChannelsSelectingInstruction } from "../../components/ChannelsSelectingInstruction";
import moment from "moment";

const HumanReadableTime = ({ unixTime }) => {
  const format = "MMM Do YYYY HH:mm:ss";

  // displaying seconds as hh:mm:ss format
  var timeStamp = moment.utc(unixTime, "X").format(format);

  return <>{timeStamp}</>;
};

const TapeItem = ({ tape, handleTapeSelectEvent, selectedTape }) => {
  var disabled = selectedTape.length > 0 && !tape.isSelected;
  const title = tape.title;
  const met_start = tape.met_start;
  const met_end = tape.met_end;
  return (
    <div
      className={`row channel-item-container channel-item-text ${
        disabled ? "channel-item-disabled" : ""
      }`}
      onClick={() => !disabled && handleTapeSelectEvent(title)}
    >
      <div
        className={`${
          tape.isSelected ? "channel-item-selected" : "channel-item-unselected"
        }`}
      ></div>
      <div className="channel-item-title d-flex col-2">
        <div className="mr-2">Tape: </div>
        <div>{title}</div>
      </div>
      <div className="col-4 channel-item-description d-flex align-items-center">
        <div className="mr-4">Tape start time: </div>
        <div>
          <HumanReadableTime unixTime={met_start} />
        </div>
      </div>
      <div className="col-4 channel-item-description d-flex align-items-center">
        <div className="mr-4">Tape end time: </div>
        <div>
          <HumanReadableTime unixTime={met_end} />
        </div>
      </div>
    </div>
  );
};

const TapeSelectMenu = ({ tapes, selectedTape, handleTapeSelectEvent }) => {
  return (
    <div className="d-flex flex-column">
      <label className="option-label">Select a tape to play from</label>
      {Object.keys(tapes).map((tapeTitle) => {
        return (
          <TapeItem
            key={tapeTitle}
            tape={tapes[tapeTitle]}
            selectedTape={selectedTape}
            handleTapeSelectEvent={handleTapeSelectEvent}
          />
        );
      })}
    </div>
  );
};

const BlockSelectMenu = (props) => {
  const handleValueChange = props.handleValueChange;
  const blockIndex = props.blockIndex;
  const minBlock = props.minBlock;
  const maxBlock = props.maxBlock;
  var blockIndexArr = [];
  for (var i = minBlock; i <= maxBlock; i++) {
    blockIndexArr.push(i);
  }
  return (
    <div className="channel-select-menu-containner">
      <label className="option-label">Choose Block number:</label>
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
  const handleValueChange = props.handleValueChange;
  const nuggetIndex = props.nuggetIndex;

  var nuggetIndexArr = [];
  for (var i = 1; i <= 7; i++) {
    nuggetIndexArr.push(i);
  }
  return (
    <div className="channel-select-menu-containner">
      <label className="option-label">Choose Nugget number:</label>
      <select
        value={nuggetIndex}
        onChange={handleValueChange}
        className="custom-select w-50"
      >
        {nuggetIndexArr.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
        {/* <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option> */}
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
      className={`row channel-item-container channel-item-text ${
        disabled ? "channel-item-disabled" : ""
      }`}
      onClick={() => !disabled && clickSelectorEvent(name)}
    >
      <div
        className={`${
          isSelected ? "channel-item-selected" : "channel-item-unselected"
        }`}
      ></div>
      <div className="channel-item-title d-flex col-3">
        <div className="mr-2">Channel: </div>
        <div>{title}</div>
      </div>
      <div className="col-8 channel-item-description d-flex align-items-center">
        <div className="mr-4">Description: </div>
        <div>{description}</div>
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
          return (
            <ChannelItem
              key={channelName}
              channelId={channels[channelName].id}
              description={channels[channelName].description}
              name={channels[channelName].name}
              title={channels[channelName].title}
              isSelected={channels[channelName].isSelected}
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
    };
  }

  isChannelSelected = (channelName) => {
    return this.state.channels[channelName].isSelected;
  };

  selectChannelAndSetState = (channelName) => {
    var channels = this.state.channels;
    channels[channelName].isSelected = true;
    this.setState({ channels: channels });
  };

  unselectChannelAndSetState = (channelName) => {
    var channels = this.state.channels;
    channels[channelName].isSelected = false;
    this.setState({ channels: channels });
  };
  addChannelAndSetState = (channelName) => {
    var selectedChannels = this.state.selectedChannels;
    selectedChannels.push(channelName);
    this.setState({ selectedChannels: selectedChannels });
    this.selectChannelAndSetState(channelName);
  };

  removeChannelAndSetState = (channelName) => {
    var selectedChannels = this.state.selectedChannels;
    var channelIndex = selectedChannels.indexOf(channelName);
    selectedChannels.splice(channelIndex, 1);
    this.setState({ selectedChannels: selectedChannels });
    this.unselectChannelAndSetState(channelName);
  };

  clickSelectorEvent = (channelName) => {
    if (!this.isChannelSelected(channelName)) {
      this.addChannelAndSetState(channelName);
    } else {
      this.removeChannelAndSetState(channelName);
    }
  };

  selectTapeAndSetState = (tapeTitle) => {
    var tapes = this.state.tapes;
    tapes[tapeTitle].isSelected = true;
    this.setState({ tapes: tapes });
  };

  unselectTapeAndSetState = (tapeTitle) => {
    var tapes = this.state.tapes;
    tapes[tapeTitle].isSelected = false;
    this.setState({ tapes: tapes });
  };

  isTapeSelected = (tapeTitle) => {
    return this.state.tapes[tapeTitle].isSelected;
  };

  addTapeAndSetState = (tapeTitle) => {
    // var selectedTape = []
    // selectedTape.push(tapeTitle)
    this.setState({ selectedTape: tapeTitle });
    this.selectTapeAndSetState(tapeTitle);
  };

  removeTapeAndSetState = (tapeTitle) => {
    // only allow select one tape, set to empty array
    this.setState({ selectedTape: "", selectedChannels: [] });
    this.unselectTapeAndSetState(tapeTitle);
  };

  handleTapeSelectEvent = async (tapeTitle) => {
    const tapeId = this.state.tapes[tapeTitle].id;
    if (!this.isTapeSelected(tapeTitle)) {
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

  handleCloseInstruction() {
    this.setState({ showInstruction: false });
  }

  handleDisplayInstruction() {
    this.setState({ showInstruction: true });
  }

  /**
   *
   * @returns true if alreadyVisited=true is stored in local storage, false otherwise
   */
  isFirstVisit() {
    return localStorage.getItem("alreadyVisited") === "true";
  }

  async fetchTapes() {
    var tapes = {};
    await fetch(`${config.apiEntry}/api/tapes`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((tape) => {
          tapes[tape.title] = tape;
          tapes[tape.title].isSelected = false;
        });
      });
    return tapes;
  }

  async fetchAndGetAllChannels() {
    var allChannels;
    await fetch(`${config.apiEntry}/api/channels`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((channel) => {
          allChannels[channel.name] = channel;
        });
      });

    return allChannels;
  }
  async fetchAndGetChannelsBelongToTape(tapeId) {
    var channels = [];
    if (!tapeId) return;
    await fetch(`${config.apiEntry}/api/multi_channels?tape=${tapeId}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((channel) => {
          if (!channels.includes(channel.channel_name)) {
            channels.push(channel.channel_name);
          }
        });
      });

    return channels;
  }

  async componentDidUpdate(prevProps, prevData) {
    var channels = {};
    var filteredChannels = this.state.filteredChannels;
    if (prevData.filteredChannels !== filteredChannels) {
      await fetch(`${config.apiEntry}/api/channels`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((channel) => {
            if (filteredChannels.includes(channel.name)) {
              channels[channel.name] = channel;
              channels[channel.name].isSelected = false;
              channels[channel.name].disabled = false;
            }
          });
          this.setState({ channels: channels });
        });
    }
  }

  async componentDidMount() {
    await this.fetchTapes().then((data) =>
      this.setState({ tapes: data, tapesLoaded: true })
    );

    let visited = this.isFirstVisit();

    // Do not view popup if this isn't the first time
    if (visited) {
      this.setState({ showInstruction: false });
    } else {
      // This is the first time
      localStorage.setItem("alreadyVisited", true);
      this.setState({ showInstruction: true });
    }
  }

  render() {
    var tapeLoaded = this.state.tapesLoaded;
    var channelsLoaded = this.state.channelsLoaded;
    var selectedChannels = this.state.selectedChannels;
    var filteredChannels = this.state.filteredChannels;
    var blockIndex = this.state.blockIndex;
    var nuggetIndex = this.state.nuggetIndex;
    var disabled = selectedChannels.length > 0 ? false : true;
    var tapes = this.state.tapes;
    var selectedTape = this.state.selectedTape;
    return (
      <div>
        <AppHeader />

        {!tapeLoaded && <p className="loading-text">LOADING DATA...</p>}

        {tapeLoaded && (
          <div className="container">
            <div className="title-banner-container">
              <span className="title-banner-text">Apollo 11 Channels</span>
            </div>
            <TapeSelectMenu
              tapes={tapes}
              selectedTape={selectedTape}
              handleTapeSelectEvent={this.handleTapeSelectEvent}
            />
            {filteredChannels.length > 0 && (
              <ChannelList
                numChannelsSelected={selectedChannels.length}
                clickSelectorEvent={this.clickSelectorEvent}
                channels={this.state.channels}
              />
            )}
            {selectedTape.length > 0 && !channelsLoaded && (
              <div> Loading channels </div>
            )}
            {
              selectedTape.length > 0 &&
                filteredChannels.length === 0 &&
                channelsLoaded && (
                  <p className=""> No audios available for this tape</p>
                )

              // if a tape is selected by no channels are currently available for this tape
              // (Object.keys(selectedTape).length > 0 && filteredChannels.length === 0)  &&
              // <p className=""> No audios available for this tape</p>
              // : ""
            }
            {selectedChannels.length > 0 && (
              <>
                <form>
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
                      />
                    </div>
                  </div>
                  <Link
                    to={{
                      pathname: "/apollo11/channels/load",
                      state: {
                        channels: {
                          selectedChannels: selectedChannels,
                          blockIndex: blockIndex,
                          nuggetIndex: nuggetIndex,
                          tapeId:
                            selectedTape.length > 0
                              ? tapes[selectedTape].id
                              : 0,
                        },
                      },
                    }}
                  >
                    <button
                      disabled={disabled}
                      className="play-channels-button btn btn-lg mt-2"
                    >
                      Play
                    </button>
                  </Link>
                </form>
              </>
            )}
          </div>
        )}
        <div className="container">
          <button
            type="button"
            className="btn btn-secondary mt-5"
            onClick={this.handleDisplayInstruction.bind(this)}
          >
            Instructions for selecting channels
          </button>
        </div>
        <ChannelsSelectingInstruction
          handleClosePopup={this.handleCloseInstruction.bind(this)}
          showInstruction={this.state.showInstruction}
        />
        <AppFooter />
      </div>
    );
  }
}
