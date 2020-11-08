import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { AppFooter, AppHeader } from "../App";
import "./index.scss";

import Spinner from "react-spinner";

import Wavesurfer from "react-wavesurfer";
import { PlayButton, AudioPlayer } from "../../components/MomentPlayer";
import config from "../../../config";
import { fromJS } from "immutable";


import {
  loadMoments,
  loadTranscripts,
  loadAudio,
  loadMetrics,
} from "../../actions";

import { MomentPlayer, Timeline } from "../../components";

import getActiveIndex from "../MomentViewer/getActiveIndex";

export class DJ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      audio: { playing: false, time: 0, momentId: 1 },
      media: [],
      transcript: [],
      metric: [],
      metStart: 0,
      metEnd: 0,
      audioUrl: "",
      title: "",
      currentMission: null,
      scPlaying: false,
      scTime: 0,
      scVolume: 1,
      apolloVolume: 1,
      crossFade: 0,
      autoplay: false,
      onEnd: null,
    };
  }

  // fetch(props) {
  //   props.loadAudio({
  //     time: 0,
  //     momentId: props.currentMomentId,
  //     playing: false
  //   });
  //   props.loadMoments({momentId: props.currentMomentId});
  //   props.loadTranscripts({momentId: props.currentMomentId});
  //   props.loadMetrics({momentId: props.currentMomentId});
  // }

  async componentDidMount() {
    let momentId = 1;
    const moments = await fetch(`${config.apiEntry}/api/moments/${momentId}`);
    const momentJson = await moments.json();
    const momentMedia = fromJS(momentJson.media);
    const startmet = fromJS(momentJson.metStart);
    const endmet = fromJS(momentJson.metEnd);
    const url = fromJS(momentJson.audioUrl);
    const t = fromJS(momentJson.title);
    const mission = fromJS(momentJson.mission);
    const transcripts = await fetch(
      `${config.apiEntry}/api/moments/${momentId}/transcripts`
    );
    const transcriptJson = await transcripts.json();
    const orgMetrics = await fetch(
      `${config.apiEntry}/api/moments/${momentId}/metrics`
    );
    const metricsJson = await orgMetrics.json();

    this.setState({
      loading: false,
      audio: { playing: false, time: 0, momentId: momentId },
      media: momentMedia,
      transcript: transcriptJson,
      metric: metricsJson,
      metStart: startmet,
      metEnd: endmet,
      audioUrl: url,
      title: t,
      currentMission: mission,
      scPlaying: false,
      scTime: 0,
      scVolume: 1,
      apolloVolume: 1,
      crossFade: 0,
      autoplay: false,
      onEnd: null,
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentMomentId !== this.props.currentMomentId) {
  //     this.fetch(nextProps);
  //   }
  // }
  playaudio() {
    this.setState({
      audio: {
        playing: true,
        time: this.state.audio.time,
        momentId: this.state.audio.momentId,
      },
    });
  }

  pauseaudio() {
    this.setState({
      audio: {
        playing: false,
        time: this.state.audio.time,
        momentId: this.state.audio.momentId,
      },
    });
  }

  seek(e) {
    const seekTime = e.originalArgs[0];
    this.setState({
      audio: {
        playing: this.state.audio.playing,
        time: this.seekTime,
        momentId: this.state.audio.momentId,
      },
    });
  }

  scPlay() {
    this.setState({ scPlaying: true });
  }

  scPause() {
    this.setState({ scPlaying: false });
  }

  scPosChange(e) {
    const scTime = e.originalArgs[0];
    this.setState({ scTime });
  }

  masterPlay() {
    this.scPlay();
    this.setState({
      audio: {
        playing: true,
        time: this.state.audio.time,
        momentId: this.state.audio.momentId,
      },
    });
  }

  masterPause() {
    this.scPause();
    this.setState({
      audio: {
        playing: false,
        time: this.state.audio.time,
        momentId: this.state.audio.momentId,
      },
    });
  }

  setVolumeFactory(playerKey) {
    return (e) => {
      this.setState({
        [playerKey]: +e.target.value,
      });
    };
  }

  crossFadeFactory() {
    return (e) => {
      this.setState({
        crossFade: +e.target.value,
      });
    };
  }

  calculateVolume(lr, crossFade, volume) {
    if (crossFade > 0 && lr === "left") {
      return (1 - crossFade) * volume;
    }
    if (crossFade < 0 && lr === "right") {
      return (1 + crossFade) * volume;
    }
    return volume;
  }

  render() {
    // const {
    //   currentMoment,
    //   currentMission,
    //   loading,
    //   currentTranscripts,
    //   loadAudio,
    const currentMission = this.state.currentMission;
    const { autoplay, onEnd } = this.state;
    if (this.state.loading) {
      return (
        <div className="text-center lead">
          <p>Loading DJ Apollo...</p>
          <Spinner />
        </div>
      );
    }

    if (!this.state.audio.momentId) {
      return <div>Error fetching moment.</div>;
    }

    const { time, playing } = this.state.audio;
    let transcripts = this.state.transcript;

    const momentMetStart = this.state.metStart;
    const currentMissionTime = momentMetStart + time * 1000;

    const activeIndex = getActiveIndex(transcripts, currentMissionTime);

    if (activeIndex >= 0) {
      transcripts[activeIndex]["active"] = true;
      const activeMessage = transcripts[activeIndex];
      transcripts[activeIndex] = activeMessage;
      transcripts = transcripts[activeIndex];
    }

    const timelineClickEvent = function (startTime) {
      const seekTime = (startTime - metStart) / 1000;
      this.state.audio.time = seekTime;
      // if(metStart) {
      //   loadAudio({
      //     time: seekTime
      //   });
      //}
    };

    const { title, audioUrl, metStart, metEnd } = this.state;
    const missionLength = currentMission ? currentMission.length : 1;

    const { scPlaying, scTime, scVolume, apolloVolume, crossFade } = this.state;

    const surferOptions = {
      normalize: true,
    };

    return (
      <div>
        <AppHeader/>
        <h1 className="text-center">Apollo 11 DJ</h1>
        <div className="dj-viewer-container">
          <div className="dj-viewer">
            <h2>Moe Shop - Crosstalk</h2>
            <AudioPlayer>
              <PlayButton
                isPlaying={scPlaying}
                play={this.scPlay.bind(this)}
                pause={this.scPause.bind(this)}
              />
              <Wavesurfer
                audioFile={
                  "https://api.soundcloud.com/tracks/255043058/stream?client_id=7535f0fce0d2cb28070cdb86b8746f77"
                }
                pos={scTime}
                playing={scPlaying}
                volume={this.calculateVolume("left", crossFade, scVolume)}
                onPosChange={this.scPosChange.bind(this)}
              />
            </AudioPlayer>
            <div>
              <small>
                Streamed from{" "}
                <a href="https://soundcloud.com">soundcloud.com</a>. Song
                Courtesy of <a href="https://moeshop.bandcamp.com/">Moe Shop</a>
                .
              </small>
            </div>
          </div>
          <div className="dj-volume-control panel panel-info">
            <div className="panel-body">
              <div className="dj-play-button-container">
                <PlayButton
                  isPlaying={scPlaying || playing}
                  pause={this.masterPause.bind(this)}
                  play={this.masterPlay.bind(this)}
                />
              </div>
              <div className="dj-volume-control-sliders">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={this.setVolumeFactory("scVolume")}
                  value={scVolume}
                  className="dj-vertical"
                />
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.01}
                  onChange={this.crossFadeFactory()}
                  className="dj-horizontal"
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={this.setVolumeFactory("apolloVolume")}
                  value={apolloVolume}
                  className="dj-vertical"
                />
              </div>
            </div>
          </div>
          <div className="dj-viewer">
            <h2 className="text-center">Landing Sequence Start</h2>

            <AudioPlayer>
              <PlayButton
                isPlaying={this.state.audio.playing}
                play={this.playaudio.bind(this)}
                pause={this.pauseaudio.bind(this)}
              />
              <Wavesurfer
                audioFile={audioUrl}
                volume={this.calculateVolume("right", crossFade, apolloVolume)}
                pos={time}
                onPosChange={this.seek.bind(this)}
                playing={playing}
                options={surferOptions}
                onFinish={onEnd}
                onReady={function () {
                  if (autoplay) {
                    this.playaudio.bind(this);
                  }
                }}
              />
            </AudioPlayer>
            <div style={{ marginTop: "0.5em" }} className="timeline-panel row">
              <Timeline
                timeline={transcripts}
                clickEvent={timelineClickEvent}
              />
            </div>
          </div>
        </div>
        <AppFooter/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { audio, metrics } = state;
  const momentId = 1;
  const { loading, entities } = state.moments;
  const { moments, missions } = entities;
  const moment = get(moments, momentId);
  if (loading || !moment) {
    return {
      currentMomentId: momentId,
      loading: true,
      currentAudio: audio,
    };
  }
  const transcripts = state.transcripts;
  const mission = get(missions, moment.mission);

  return {
    currentMomentId: momentId,
    loading,
    currentMission: mission,
    currentMoment: moment,
    currentTranscripts: transcripts,
    currentAudio: audio,
    metrics,
  };
}

export default connect(mapStateToProps, {
  loadMoments,
  loadTranscripts,
  loadAudio,
  loadMetrics,
})(DJ);
