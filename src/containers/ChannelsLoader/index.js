import React, { Component } from "react";
import config from "../../../config";
import getTranscripts from "./getTranscripts";
import { Link, Redirect } from "react-router-dom";
// import createHistory from 'history/createBrowserHistory'
export class ChannelsLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      channels:
        this.props.location && this.props.location.state
          ? this.props.location.state.channels
          : null,
    };
  }

  removeBrowserHistoryState() {
    const { location, history } = this.props;
    if (history.location.state && history.location.state.channels) {
      let state = { ...location.state };
      delete state.channels;
      history.replace({ ...location, state });
    }
  }

  setSelectedChannelsState() {
    const selectedChannels = this.state.channels.selectedChannels;
    this.setState({ selectedChannels });
  }

  setBlockIndexState() {
    const blockIndex = this.state.channels.blockIndex;
    this.setState({ blockIndex });
  }

  setNuggetIndexState() {
    const nuggetIndex = this.state.channels.nuggetIndex;
    this.setState({ nuggetIndex });
  }

  setTapeIdState() {
    const tapeId = this.state.channels.tapeId;
    this.setState({ tapeId });
  }

  setMinAndMaxBlock() {
    const {minBlock, maxBlock} = this.state;
    this.setState({ minBlock, maxBlock });
  }

  /**
   * channelsExist checks if there are data in channels state
   * @returns true if channels data can be received from props, otherwise false
   */
  channelsExist() {
    return this.state.channels ? true : false;
  }

  async fetchAudioAndTranscripts(channelName) {
    var data;
    const {blockIndex, nuggetIndex, tapeId} = this.state;
    const mission = this.props.match.params.mission;
    const fetchUrl = `${config.apiEntry}/api/missions/${mission}/tapes/${tapeId}/multi_channels?block=${blockIndex}&nugget=${nuggetIndex}&channel=${channelName}`;
    await fetch(fetchUrl)
      .then((response) => response.json())
      .then((json) => {
        data = json[0];
      })
      .catch((error) => console.log(error));
    return data;
  }

  getDataFromResponse(response) {
    if (!response) {
      return null;
    }
    var channel = {...response};
    return channel;
  }

  async componentDidUpdate() {
    if (this.state.selectedChannels && this.state.loading) {
      var data = {};
      var channelNames = this.state.selectedChannels;
      if (this.state.loading && channelNames) {
        await Promise.all(channelNames.map(async (channelName, index) => {
          data[index] = {};
          let transcriberUrl;
          await this.fetchAudioAndTranscripts(channelName).then(
            (response) => {
              var channel = this.getDataFromResponse(response);
              if (channel) {
                data[index].channel = channel;
                transcriberUrl = response.transcriber.transcriberUrl;
              }
            }
          );
          if (transcriberUrl) {
            await getTranscripts(transcriberUrl).then((transcripts) => {
              data[index].transcripts = transcripts;
            });
          }
        }));
        this.setState({ data: data, loading: false });
      }
    }

    // finish loading
  }

  componentDidMount() {
    if (this.channelsExist()) {
      this.setSelectedChannelsState();
      this.setBlockIndexState();
      this.setNuggetIndexState();
      this.setTapeIdState();
      this.setMinAndMaxBlock();
    }
  }
  render() {
    const mission = this.props.match?.params?.mission;
    const channels = this.state.selectedChannels;
    const {loading, data, tapeId, minBlock, maxBlock} = this.state;
    if (!channels || (data && Object.keys(data).lengh === 0)) {
      return (
        <div className="d-flex flex-column">
          <div className="error-message">
            Error loading channels, please select channels to listen
          </div>

          <Link to={`/channels/${mission}`}>
            <button type="button" className="btn btn-primary">
              Select New Channels
            </button>
          </Link>
        </div>
      );
    }
    return loading ? (
      <div className="loading-text">LOADING DATA...</div>
    ) : (
      <Redirect
        to={{
          pathname: `/channels/play/${mission}`,
          state: {
            audioData: data,
            tapeId: tapeId,
            minBlock: minBlock,
            maxBlock: maxBlock,
          },
        }}
      />
    );
  }
}
