import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonPlans } from "../../containers";

export function LessonList() {

    return (
        <div className="app-container">
            <h3>
                Lesson plans are categorized as follows: <br></br>
                K-2, 3-5, 6-8, and 9-12
           </h3>
            <h4>
            <br></br>
                <b>K-2:</b>
                <br></br>History: 
                    <button className= 'k-2histbtn'>
                        <a href='https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/who-was-neil-armstrong-k4.html'> <font color='#000000'> Who was Neil Armstrong?</font> </a>
                    </button>
                <br></br>Tech: 
                <button className= 'k-2techbtn'>
                        <a href='https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-a-spacesuit-k4.html'> <font color='#000000'> What did Neil wear to the moon?</font> </a>
                    </button>
                <br></br>Activities: 
                <button className= 'k-2techbtn'>
                        <a href='https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-a-spacesuit-k4.html'> <font color='#000000'> Listen to Neil Armstrong's famous words. </font> </a>
                    </button> What would you say if you were on the moon?

            </h4>
            <h4>
            <br></br>
                <b>3-5:</b>
                <br></br>History<br></br>Tech<br></br>Practical/Activities

            </h4>
            <h4>
            <br></br>
                <b>6-8:</b>
                <br></br>History<br></br>Tech<br></br>Practical/Activities

            </h4>
            <h4>
            <br></br>
                <b>9-12:</b>
                <br></br>History<br></br>Tech<br></br>Practical/Activities
            </h4>
        </div>
    );

}