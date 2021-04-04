import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spinner from "react-spinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import config from "../../../config";
import { fromJS } from "immutable";
import { metrics as setMetrics } from "../../reducers";
import { AppFooter, AppHeader } from "../App";
import {ChannelPlayer} from '../../components/ChannelPlayer';




export const ChannelItem = ()=>(
    <div className="text-center lead col">
    <p>Loading channel...</p>
    <Spinner />
  </div>
)

const updateState = (newData) =>{
    return (previousState, currentProps) =>{
        return {...previousState, data: newData}
    }
}

export class ChannelViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: []
          };

    }

    async componentDidMount() {
        let data ={};
        let idParam = this.props.match.params.momentId;
        let ids = idParam.split('&');

        // await Promise.all(requestTranscript)
        // .then(responses =>
        //     Promise.all(responses.map(r=>r.json())))
        //     .then(transcripts =>transcripts.forEach(transcript => data[moment.momentId]['moment'] = moment))   
        data[ids[0]]={}
        await fetch(`${config.apiEntry}/api/moments/${ids[0]}`)
        .then(response => response.json())
        .then(json => {
            data[ids[0]]['moment'] = json
        })
        await fetch(`${config.apiEntry}/api/moments/${ids[0]}/transcripts`)
        .then(response => response.json())
        .then(json => {
            data[ids[0]]['transcript'] = json
        })

        if (ids.length >1){

            data[ids[1]]={}

            await fetch(`${config.apiEntry}/api/moments/${ids[1]}`)
            .then(response => response.json())
            .then(json => {
                data[ids[1]]['moment'] = json
            })

            await fetch(`${config.apiEntry}/api/moments/${ids[1]}/transcripts`)
            .then(response => response.json())
            .then(json => {
                data[ids[1]]['transcript'] = json
            })
    }

    if (ids.length > 2){
        data[ids[2]]={}

        await fetch(`${config.apiEntry}/api/moments/${ids[2]}`)
        .then(response => response.json())
        .then(json => {
            data[ids[2]]['moment'] = json
        })
        await fetch(`${config.apiEntry}/api/moments/${ids[2]}/transcripts`)
        .then(response => response.json())
        .then(json => {
            data[ids[2]]['transcript'] = json
        })
    }
        
        this.setState({data:data, loading: false})

    }
    
    
    render(){

        let loading = this.state.loading;
        let data = this.state.data;


        // check if all of channel has been fetched (the length of the array should greater or equal to the number of ids)
        if (loading) {
            return (
              <div>
                <AppHeader />
                    <Spinner/>

                <AppFooter />
              </div>
            );
        }

        return(
            <div>
                <AppHeader />
            <div className="row">
                {
                    Object.keys(data).map((key, index)=>{
                        return(
                            <div className="col" key={key}>
                                <ChannelPlayer autoplay={false}  data={data[key]} />
                            </div>
                        )
                    })

                }

            </div>
            <AppFooter />
            </div>
        )
    }

}