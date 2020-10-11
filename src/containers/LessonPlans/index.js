import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonList } from "../../components";

export class LessonPlans extends Component {

    render() {


        return (

            <div>

                <h1>Lessons</h1>
                <LessonList />
            </div>

        );

    }

}