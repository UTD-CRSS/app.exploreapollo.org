import React, {Component} from 'react';
import { AppFooter, AppHeader } from "../App";
import {MomentList} from "../../components/MomentList";

export class Channels extends  Component{
    constructor(props){
        super(props);
    }

    render() {

        return(
            <div>
                <AppHeader/>

                {/* display list of all moments */}
                <div className="moment-container">
                    <div className="titleBanner-smaller">Apollo 11 Channels</div>
                    {/* <MomentList moments={moments} /> */}
                </div>

                <AppFooter/>
            </div>
        )
    }

}



