import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LessonList } from "../../components";
import {Dashboard} from "../Dashboard";

export class LessonPlans extends Component 
{
  render() 
  {
    return (
      <nav className="navbar navbar-brand navbar-expand-xl navbar-inverse">
        <div className="container-fluid">
            <Link to="/" className="ExploreApollo">
              Explore Apollo
            </Link>
        <div className="navitem">
        <button className="navbtn">Lesson Plans</button>
        <div class="dropdown-content">
              <a href="#">K-2</a>
              <a href="#">3-5</a>
              <a href="#">6-8</a>
              <a href="#">9-12</a>
            </div>
        </div>
    );
  }
}