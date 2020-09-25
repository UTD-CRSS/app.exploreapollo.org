import React, {Component} from "react";
import { connect } from "react-redux";
import {get} from "lodash";

import "./index.scss";

import Spinner from "react-spinner";

import Wavesurfer from "react-wavesurfer";
import {PlayButton, AudioPlayer} from "../../components/MomentPlayer";

import {
  loadMoments,
  loadTranscripts,
  loadAudio,
  loadMetrics
} from "../../actions";

import {
  MomentPlayer,
  Timeline
} from "../../components";

import getActiveIndex from "../MomentViewer/getActiveIndex";

export class DJ extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  fetch(props) {
    props.loadAudio({
      time: 0,
      momentId: props.currentMomentId,
      playing: false
    });
    props.loadMoments({momentId: props.currentMomentId});
    props.loadTranscripts({momentId: props.currentMomentId});
    props.loadMetrics({momentId: props.currentMomentId});
  }

  componentWillMount() {
    this.fetch(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMomentId !== this.props.currentMomentId) {
      this.fetch(nextProps);
    }
  }

  scPlay() {
    this.setState({scPlaying: true});
  }

  scPause() {
    this.setState({scPlaying: false});
  }

  scPosChange(e) {
    const scTime = e.originalArgs[0];
    this.setState({scTime});
  }

  masterPlay() {
    this.scPlay();
    this.props.loadAudio({playing: true});
  }

  masterPause() {
    this.scPause();
    this.props.loadAudio({playing: false});
  }

  setVolumeFactory(playerKey) {
    return (e) => {
      this.setState({
        [playerKey]: +e.target.value
      });
    };
  }

  crossFadeFactory() {
    return (e) => {
      this.setState({
        crossFade: +e.target.value
      });
    };
  }

  calculateVolume(lr, crossFade, volume) {
    if (crossFade > 0 && lr === "left") {
      return (1-crossFade) * volume;
    }
    if (crossFade < 0 && lr === "right") {
      return (1+crossFade) * volume;
    }
    return volume;
  }

  render() {
    const {
      currentMoment,
      currentMission,
      loading,
      currentTranscripts,
      loadAudio,
      onEnd,
      autoplay
    } = this.props;

    if (loading) {
      return <div className="text-center lead">
        <p>Loading moment...</p>
        <Spinner />
      </div>;
    }

    if (!currentMoment) {
      return <div>
        Error fetching moment.
      </div>;
    }

    const {time, playing} = this.props.currentAudio;
    let {transcripts} = currentTranscripts;

    //this is bad, but necessary until I can think of a clever solution
    transcripts = transcripts.map(function(i) {
      return i.set("active", false);
    });

    const momentMetStart = this.props.currentMoment.metStart;
    const currentMissionTime = momentMetStart + (time * 1000);

    const activeIndex = getActiveIndex(
      transcripts,
      currentMissionTime
    );

    if(activeIndex >= 0) {
      const activeMessage = transcripts.get(activeIndex).set("active", true);
      transcripts = transcripts.set(activeIndex, activeMessage);
    }

    const timelineClickEvent = function(startTime) {
      const seekTime = (startTime - metStart) / 1000;
      if(metStart) {
        loadAudio({
          time: seekTime
        });
      }
    };

    const {
      title,
      audioUrl,
      metStart,
      metEnd
    } = currentMoment;
    const missionLength = currentMission.length;

    const {
      scPlaying = false,
      scTime = 0,
      scVolume = 1,
      apolloVolume = 1,
      crossFade = 0
    } = this.state;

    return (
      <div>
        <h1 className="text-center">
          Apollo 11 DJ
        </h1>
        <div className="dj-viewer-container">
          <div className="dj-viewer">
            <h2>Moe Shop - Crosstalk</h2>
            <AudioPlayer>
              <PlayButton
                isPlaying={scPlaying}
                play={this.scPlay.bind(this)}
                pause={this.scPause.bind(this)} />
              <Wavesurfer
                audioFile={"https://api.soundcloud.com/tracks/255043058/stream?client_id=7535f0fce0d2cb28070cdb86b8746f77"}
                pos={scTime}
                playing={scPlaying}
                volume={this.calculateVolume("left", crossFade, scVolume)}
                onPosChange={this.scPosChange.bind(this)}
              />
            </AudioPlayer>
            <div>
              <small>
                Streamed from <a href="https://soundcloud.com">soundcloud.com</a>.
                Song Courtesy of <a href="https://moeshop.bandcamp.com/">Moe Shop</a>.
              </small>
            </div>
          </div>
          <div className="dj-volume-control panel panel-info">
            <div className="panel-body">
              <div className="dj-play-button-container">
                <PlayButton isPlaying={scPlaying || playing}
                            pause={this.masterPause.bind(this)}
                            play={this.masterPlay.bind(this)} />
              </div>
              <div className="dj-volume-control-sliders">
                <input type="range" min={0} max={1} step={0.01} onChange={this.setVolumeFactory("scVolume")} value={scVolume} className="dj-vertical" />
                <input type="range" min={-1} max={1} step={0.01} onChange={this.crossFadeFactory()} className="dj-horizontal" />
                <input type="range" min={0} max={1} step={0.01} onChange={this.setVolumeFactory("apolloVolume")} value={apolloVolume} className="dj-vertical" />
              </div>
            </div>
          </div>
          <div className="moment-viewer-container">
            <MomentPlayer
              volume={this.calculateVolume("right", crossFade, apolloVolume)}
              title={title}
              titleEl={(title) => <h2>{title}</h2>}
              url={audioUrl}
              start={metStart}
              end={metEnd}
              time={time}
              playing={playing}
              loadAudio={loadAudio}
              autoplay={autoplay}
              onEnd={onEnd}
              missionLength={missionLength} />
            <div style={{marginTop: "0.5em"}} className="timeline-panel row">
              <Timeline
                timeline={transcripts}
                clickEvent={timelineClickEvent}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {audio, metrics} = state;
  const momentId = 1;
  const { loading, entities } = state.moments;
  const { moments, missions } = entities;
  const moment = get(moments, momentId);
  if (loading || !moment) {
    return {
      currentMomentId: momentId,
      loading: true,
      currentAudio: audio
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
    metrics
  };
}

export default connect(mapStateToProps, {
  loadMoments,
  loadTranscripts,
  loadAudio,
  loadMetrics
})(DJ);

