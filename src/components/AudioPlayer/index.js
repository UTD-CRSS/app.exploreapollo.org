import React, { Component } from "react";
import Wavesurfer from "react-wavesurfer";
import "./index.scss";
import mediaplay from "../../../node_modules/open-iconic/png/media-play-6x.png";
import mediapause from "../../../node_modules/open-iconic/png/media-pause-6x.png";
import volumeHigh from "../../../node_modules/open-iconic/png/volume-high-4x.png";
import volumeOff from "../../../node_modules/open-iconic/png/volume-off-4x.png";
// import "open-iconic";



function MuteButton({volume, mute, unMute}){
  //volume 100 or 0
  
  // volume = 100 --> show full volume button
  // volume = 0 --> show mute volume button
  // 
  // if (volumm === 100)
  const muteEvent = volume? mute : unMute;

  return(
    <div onClick={muteEvent}
      className="muteButtonContainer">
      
      {
        volume? (<img src={volumeHigh} alt="volume-high"></img>):
                (<img src={volumeOff} alt="volume-off"></img>)
      }
    </div>
  )
}

function PlayButton({ isPlaying, play, pause }) {
  const clickFunction = isPlaying ? pause : play;
  return (
    <div
      style={{ color: "#000"}}
      className="playButtonContainer1"
      onClick={clickFunction}
    >
      {!isPlaying ? (
        <img src={mediaplay} className="play1"></img>
      ) : (
        <img src={mediapause} className="pause1"></img>
      )}
    </div>
  );
}



export class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      time: this.props.time, 
      clickEvent: this.props.clickEvent,
      volume: 1,
      playAll: this.props.playAll,
      pauseAll: this.props.pauseAll,
      playing: this.props.playAll,
      togglePausePlayEvent: this.props.togglePausePlay,
      operation: this.props.operation
    };
  }

  playAudio=  ()=> {

    this.props.togglePausePlay()
    this.setState({ playing: true, pauseAll: this.props.pauseAll});
  }

  pauseAudio =()=> {

    this.props.togglePausePlay()
    this.setState({ playing: false, playAll: this.props.playAll });
  }

  muteAudio(){
    this.setState({volume: 0});
  }

  unmuteAudio(){
    this.setState({volume: 1});
  }

  seek(e) {
    const seekTime = e.originalArgs[0];
    this.state.clickEvent("player",seekTime);
  }

  onEnd =()=>{
    this.setState({playing: false})
  }


  getAudioFileName(){
    // find index of string to get substring,  audio filename has "audio/" following by the actual filename
    var fileName
    const url = this.props.url
    if (url){
      var startIndex = url.indexOf("audio/")
      fileName = url.substring(startIndex + 6, url.length - 4)
    }
    return fileName
  }

componentDidUpdate(){

  if (!this.state.playing && this.props.playAll && !this.state.playAll){
      this.setState({playing: true})
  }

  if (this.state.playing && this.props.pauseAll && !this.state.pauseAll){
    this.setState({playing: false})
}

  }

  render() {
    const {
      url,
      time,
      autoplay,
      operation,
      channelName
      // volume,
    } = this.props;
    
    const { playing, volume } = this.state;
    const audioFileName = this.getAudioFileName()
    
    const surferOptions = {
      normalize: true,    

    };



    return (
      <div className="moment-player-panel">
          <h1 className="text-center audio-title">Playing: {channelName}</h1>
          <h1 className="text-center audio-title">Operation: {operation}</h1>

          <h3 className="audio-filename-text">{audioFileName}</h3>
        <div className='d-flex flex-row align-items-center'>
          <PlayButton
            isPlaying={(playing || this.props.playAll) && !this.props.pauseAll}
            play={()=>this.playAudio()}
            pause={() => this.pauseAudio()}
            className="col-1"
          />
          <MuteButton
            volume={this.state.volume}
            mute={() => this.muteAudio()}
            unMute={() => this.unmuteAudio()}
            className="col-2"
          />
          <div className="col p-0 ml-1">
          <Wavesurfer
            audioFile={url}
            volume={volume}
            pos={time}
            onPosChange={this.seek.bind(this)}
            playing={(playing || this.props.playAll) && !this.props.pauseAll}
            options={surferOptions}
            onFinish={() => this.onEnd()}
            onReady={ 
              autoplay && this.playaudio.bind(this)
            }
          />
          </div>
        </div>
      </div>
    );
  }
}
