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
                    COMING SOON:
                    Learn about the Apollo Missions through guided lesson plans for all ages
            </h1>
                <LessonList />
                <AppFooter />
            </div>
        );

    }

}