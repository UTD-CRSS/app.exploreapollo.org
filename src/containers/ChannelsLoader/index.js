import React, {Component} from 'react';
import config from "../../../config";
import getTranscripts from './getTranscripts'
import {Link, Redirect} from 'react-router-dom'
// import createHistory from 'history/createBrowserHistory'
export class ChannelsLoader extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            channels: this.props.location.state.channels,
        }
    }

    removeBrowserHistoryState(){
        const {location, history} = this.props
        if (history.location.state && history.location.state.channels){
            let state = { ...location.state };
            delete state.channels;
            history.replace({...location, state})
        }
    }

    setSelectedChannelsState(){
        var selectedChannels = this.state.channels.selectedChannels
        this.setState({selectedChannels: selectedChannels})
    }

    setBlockIndexState(){
        var blockIndex = this.state.channels.blockIndex
        this.setState({blockIndex: blockIndex})
    }

    setNuggetIndexState(){
        var nuggetIndex = this.state.channels.nuggetIndex
        this.setState({nuggetIndex: nuggetIndex})
    }

    /**
     * channelsExist checks if there are data in channels state
     * @returns true if channels data can be received from props, otherwise false
     */
    channelsExist(){
        return this.state.channels ? true : false
    }

    async fetchAudioAndTranscripts (channelName){
        var data
        const blockIndex = this.state.blockIndex
        const nuggetIndex = this.state.nuggetIndex
        const fetchUrl = `${config.apiEntry}/api/multi_channels?channel=${channelName}&block=${blockIndex}&nugget=${nuggetIndex}`
        await fetch(fetchUrl)
        .then(response => response.json())
        .then(json => {
            data = json[0]
        })
        .catch((error)=>console.log(error))
        console.log(data)
        return data
    }

    getDataFromResponse(response){
        var channel={}
        if (!response){
            return null
        }
        channel['audioUrl'] = response.audioUrl
        channel['channel_name'] = response.channel_name
        channel['title'] = response.title
        channel['id'] = response.id
        channel['blockIndex'] = response.block_index
        channel['nuggetIndex'] = response.nugget_index
        return channel
    }
    async componentDidUpdate(){
        if (this.state.selectedChannels && this.state.loading){
            var data=Object()
            var channelNames = this.state.selectedChannels
            if (this.state.loading && channelNames){
                data[0] = {}

                var transcriberUrl

                await this.fetchAudioAndTranscripts(channelNames[0])
                .then(
                    response => {
                        var channel= this.getDataFromResponse(response)
                        if(channel)
                        {
                            data[0].channel = channel
                            transcriberUrl = response.transcriber.transcriberUrl

                        }
                    }
                )
                if (transcriberUrl){
                    await getTranscripts(transcriberUrl)
                    .then(transcripts => {
                        data[0].transcripts = transcripts
                    })
                }
                if (channelNames.length > 1){
                    data[1] = {}

                    let transriberUrl1
                    await this.fetchAudioAndTranscripts(channelNames[1])
                    .then(
                        response => {
                            var channel= this.getDataFromResponse(response)
                            if (channel)
                            {
                                data[1].channel = channel
                                transriberUrl1 = response.transcriber.transcriberUrl
                            }
                        }
                    )
                    if (transriberUrl1){
                        await getTranscripts(transriberUrl1)
                        .then(transcripts => {
                            data[1].transcripts = transcripts
                        })
                    }
                }

                if (channelNames.length > 2){
                    data[2] = {}

                    let transriberUrl1

                    await this.fetchAudioAndTranscripts(channelNames[2])
                    .then(
                        response => {
                            var channel= this.getDataFromResponse(response)
                            if (channel){
                                data[2].channel = channel
                                transriberUrl1 = response.transcriber.transcriberUrl

                            }
                        }
                    )

                    if (transriberUrl1){
                        await getTranscripts(transriberUrl1)
                        .then(transcripts => {
                            if (transcripts)
                                data[2].transcripts = transcripts
                        })
                    }
                }       
                this.setState({data:data, loading: false})
            }
        }

        // finish loading

    }

    componentDidMount() {
        
        if (this.channelsExist()){
            this.setSelectedChannelsState()
            this.setBlockIndexState()
            this.setNuggetIndexState()
            // this.removeBrowserHistoryState()

        }       

    }
    render() {
        var channels = this.state.selectedChannels
        var loading = this.state.loading
        var data = this.state.data
        if (!channels || (data && Object.keys(data).lengh === 0)){
            return(
                <div className="d-flex flex-column">
                <div>Error loading channels, please select channels to listen </div>

                <Link to="/apollo11/channels">
                    <button type="button" className="btn btn-primary">Select New Channels</button>
                </Link>
            </div>
            )
        }

        return(
            
                loading ? <div className="loading-text">LOADING DATA...</div> 
                    : <Redirect to={{pathname:'/apollo11/channels/play',
                            state:{
                                audioData: data
                            }}} />
            
        )
    }
}