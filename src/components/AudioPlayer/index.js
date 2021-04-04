import React, { Component } from "react";
import Wavesurfer from "react-wavesurfer";
import "./index.scss";
import mediaplay from "../../../node_modules/open-iconic/png/media-play-6x.png";
import mediapause from "../../../node_modules/open-iconic/png/media-pause-6x.png";
import volumeHigh from "../../../node_modules/open-iconic/png/volume-high-4x.png";
import volumeOff from "../../../node_modules/open-iconic/png/volume-off-4x.png";
// import "open-iconic";
export function wrapAudioPlayerElements(child) {
  const PlayButtonName = PlayButton.name;
  const WavesurferName = Wavesurfer.name;
  const height = "128px";
  const styles = {
    [PlayButtonName]: {
      position: "absolute",
      width: height,
      height: height,
      padding: 5,
    },
    [WavesurferName]: {
      marginLeft: height,
    },
  };
  return <div style={styles[child.type.name]}>{child}</div>;
}

// export function AudioPlayer({ children }) {
//   const containerStyles = {
//     position: "relative",
//   };
//   return (
//     <div style={containerStyles}>
//       {React.Children.map(children, wrapAudioPlayerElements)}
//     </div>
//   );
// }

export function MuteButton({volume, mute, unMute}){
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
                // The problem is it cannot find the image I'm reading documentation
                //will it always show up next to the play button? or can we change its location?
                // anywhere we want
                // up to us
                //ok
                //kinda work, do you see the 
                // let me checktext
                // i see the volume high text??
      }
    </div>
  )
}

export function PlayButton({ isPlaying, play, pause }) {
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
      playing: this.props.playing, 
      time: this.props.time, 
      clickEvent: this.props.clickEvent,
      volume: 1 
    };
  }

  playaudio() {
    this.setState({ playing: true });
  }

  pauseaudio() {
    this.setState({ playing: false });
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

  render() {
    const {
      url,
      time,
      onEnd,
      autoplay,
      title,
      titleEl,
      // volume,
    } = this.props;
    
    const { playing, volume } = this.state;

    const surferOptions = {
      normalize: true,
    };

    return (
      <div className="moment-player-panel">
        {titleEl ? (
          titleEl(title)
        ) : (
          <h1 className="text-center">Now Playing: {title}</h1>
        )}
        <div className='d-flex flex-row align-items-center'>
          <PlayButton
            isPlaying={playing}
            play={this.playaudio.bind(this)}
            pause={this.pauseaudio.bind(this)}
            className="col-1"
          />
          <MuteButton
            volume={this.state.volume}
            mute={this.muteAudio.bind(this)}
            unMute={this.unmuteAudio.bind(this)}
            className="col-2"
          />
          <div className="col p-0 ml-1">
          <Wavesurfer
            audioFile={url}
            volume={volume}
            pos={time}
            onPosChange={this.seek.bind(this)}
            playing={playing}
            options={surferOptions}
            onFinish={onEnd}
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
