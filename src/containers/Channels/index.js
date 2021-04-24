import React, {Component} from 'react';
import { AppFooter, AppHeader } from "../App";
import config from "../../../config";
import './index.scss'
import {Link} from 'react-router-dom';
import {ChannelsSelectingInstruction} from '../../components/ChannelsSelectingInstruction'

//list of channels having audios, current Channels table in database has a lot of channels
// filter channels using this list

const availableChannels=[  
    "flight-director", "mocr", "ntwk", "gnc", "eecom"
]


const BlockSelectMenu = (props)=>{
    const handleValueChange = props.handleValueChange
    const blockIndex = props.blockIndex
    return(

        <div className="channel-select-menu-containner">
            <label className="option-label">Choose Block number:</label>
            <select value={blockIndex} 
                onChange={handleValueChange} 
                className="custom-select w-50">
                    
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>

            </select>
        </div>

    )
}

const NuggetSelectMenu = (props)=>{
    const handleValueChange = props.handleValueChange
    const nuggetIndex = props.nuggetIndex
    return(
        <div className="channel-select-menu-containner">
            <label className="option-label">Choose Nugget number:</label>
            <select value={nuggetIndex} 
                onChange={handleValueChange} 
                className="custom-select w-50">
                    
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>

            </select>
        </div>
    )
}

const ChannelItem = ({ description, title, name, isSelected, clickSelectorEvent, numChannelsSelected}) =>{
    var disabled = (numChannelsSelected == 3 && !isSelected)
    return (
        <div className={`row channel-item-container channel-item-text ${disabled?"channel-item-disabled":""}`}  onClick={() => !disabled && clickSelectorEvent(name)}>
            <div className={`${isSelected? "channel-item-selected": "channel-item-unselected"}`}></div>
            <div className="channel-item-title d-flex col-3">
                <div className="mr-2">Channel: </div>
                <div>{title}</div>
            </div>
            <div className="col-8 channel-item-description d-flex align-items-center">
                <div className="mr-4">Description: </div>
                <div>{description}</div>
            </div>
        </div>
    )
}


const ChannelList = ({channels, clickSelectorEvent, numChannelsSelected})=>{

    return(
        
        <div className="d-flex flex-column align-items-center">
            {
                Object.keys(channels).map((channelName, index)=>{
                        return <ChannelItem key={channelName} channelId={channels[channelName].id} 
                            description={channels[channelName].description} 
                            name={channels[channelName].name} 
                            title={channels[channelName].title} 
                            isSelected={channels[channelName].isSelected}
                            // disabled={channels[channelName].disabled}
                            clickSelectorEvent={clickSelectorEvent.bind(this)}
                            numChannelsSelected={numChannelsSelected}
                        />
                })
            }
        </div>
    )
}


export class Channels extends  Component{
    constructor(props){
        super(props);
        this.state={
            channelsLoaded: false,
            channels: {},
            selectedChannels: [],
            blockIndex: 1,
            nuggetIndex: 1,
            showInstruction: false,
            
        }
    }

    isSelected = (channelName) =>{
        return this.state.channels[channelName].isSelected
    }

    selectChannelAndSetState = (channelName)=>{
        var channels = this.state.channels
        channels[channelName].isSelected = true
        this.setState({channels: channels})
    }

    unselectChannelAndSetState = (channelName) =>{
        var channels = this.state.channels
        channels[channelName].isSelected = false
        this.setState({channels: channels})
    
    }
    addChannelAndSetState = (channelName)=>{
        var selectedChannels = this.state.selectedChannels
        selectedChannels.push(channelName)
        this.setState({selectedChannels: selectedChannels})
        this.selectChannelAndSetState(channelName)
    }
    
    removeChannelAndSetState = (channelName) =>{
        var selectedChannels = this.state.selectedChannels
        var channelIndex = selectedChannels.indexOf(channelName)
        selectedChannels.splice(channelIndex, 1)
        this.setState({selectedChannels: selectedChannels})
        this.unselectChannelAndSetState(channelName)

    }

    clickSelectorEvent = (channelName)=>{
        if (!this.isSelected(channelName)){
            this.addChannelAndSetState(channelName)
        }else{
            this.removeChannelAndSetState(channelName)
        }
    }

    handleBlockInputChange = (event) =>{
        const blockIndex = event.target.value
        this.setState({blockIndex: blockIndex})
    }

    handleNuggetInputChange = (event) =>{
        const nuggetIndex = event.target.value
        this.setState({nuggetIndex: nuggetIndex})
    }

    handleCloseInstruction(){
        this.setState({showInstruction: false})
    }

    handleDisplayInstruction(){
        this.setState({showInstruction: true})
    }

    /**
     * 
     * @returns true if alreadyVisited=true is stored in local storage, false otherwise
     */
    isFirstVisit(){
        return localStorage.getItem("alreadyVisited") === "true"
    }

    componentDidMount(){
        var channels={}
        if (!this.state.channelsLoaded){
            fetch(`${config.apiEntry}/api/channels`)
            .then(response => response.json())
            .then(data => {
                data.forEach(channel =>{
                    if (availableChannels.includes(channel.name)){
                        channels[channel.name] = channel
                        channels[channel.name].isSelected = false
                        channels[channel.name].disabled = false

                    }
                })
                this.setState({channels: channels, channelsLoaded: true})

            })
        }

        let visited = this.isFirstVisit()

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
        var channelsLoaded = this.state.channelsLoaded
        var selectedChannels = this.state.selectedChannels
        var blockIndex = this.state.blockIndex
        var nuggetIndex = this.state.nuggetIndex
        var disabled = selectedChannels.length > 0 ? false : true
        return(
            <div>
                <AppHeader/>

                {!channelsLoaded &&
                        <p className="loading-text">
                            LOADING DATA...
                        </p>
                }

                {   channelsLoaded &&
                <div className="container">
                    <div className="title-banner-container">
                        <span className="title-banner-text">Apollo 11 Channels</span>
                    </div>
                    <ChannelList numChannelsSelected={this.state.selectedChannels.length} clickSelectorEvent={this.clickSelectorEvent} channels={this.state.channels}/>

                <form >
                    <div className="d-flex">
                        <div>
                        <BlockSelectMenu blockIndex={this.state.blockIndex} handleValueChange={this.handleBlockInputChange} />
                        </div>
                        <div>
                        <NuggetSelectMenu nuggetIndex={this.state.nuggetIndex} handleValueChange={this.handleNuggetInputChange} />
                        </div>
                    </div>
                    <Link to={{
                    pathname: '/apollo11/channels/load',
                    state:{
                        channels: {
                            selectedChannels: selectedChannels,
                            blockIndex: blockIndex,
                            nuggetIndex: nuggetIndex
                        }
                    }
                    }}>
                        <button disabled={disabled} className="play-channels-button btn btn-lg mt-2">Play</button>
                    </Link>
                </form>


                <button type="button" className="btn btn-secondary mt-5" onClick={this.handleDisplayInstruction.bind(this)}>Instructions for selecting channels</button>
                    <ChannelsSelectingInstruction handleClosePopup={this.handleCloseInstruction.bind(this)} showInstruction={this.state.showInstruction} />
                </div>
                
            }
                <AppFooter/>
            </div>
        )
    }

}



