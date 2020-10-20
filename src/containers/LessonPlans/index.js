import { divide } from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonList } from "../../components";
import { AppFooter, AppHeader } from "../App";
import { Dashboard } from "../Dashboard";

export class LessonPlans extends Component {
    render() {
        return ( //Testing manually adding in navbar/footer
            <div className="app-container">
                <AppHeader /> 
                <h1>
                <br></br><u><font size="7">Preparing to Launch:</font></u><br></br>
                    <i><font size="6">Learn about the Apollo Missions through our guided curriculum!</font></i>
            </h1>
                <LessonList />
                <AppFooter />
            </div>
        );

    }

}