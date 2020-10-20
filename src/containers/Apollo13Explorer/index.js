import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppFooter, AppHeader } from "../App";
import { Apollo13StoryTimeline } from "../../components";
import { Dashboard } from "../Dashboard";

export class Apollo13Explorer extends Component {
    render() {
        return ( //Testing manually adding in navbar/footer
            <div className="app-container">
                <AppHeader /> 
                <h1>
                WELCOME
            </h1>
                <Apollo13StoryTimeline />
                <AppFooter />
            </div>
        );

    }

}