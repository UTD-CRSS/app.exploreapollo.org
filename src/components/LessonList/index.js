import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonPlans } from "../../containers";

export function LessonList() {

    return (
        <div className="app-container">
            <h3>
                Lesson plans are categorized as follows:
                K-2, 3-5, 6-8, and 9-12
           </h3>
            <h4>
                K-2:
                Who is Neil Armstrong?
                Tech
                Practical/Activities

            </h4>
            <h4>

                3-5:
                History
                Tech
                Practical/Activities

            </h4>
            <h4>

                6-8:
                History
                Tech
                Practical/Activities

            </h4>
            <h4>
                9-12:
                History
                Tech
                Practical/Activities
            </h4>
        </div>
    );

}